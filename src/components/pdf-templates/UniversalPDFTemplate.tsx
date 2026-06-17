import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#4b5563',
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
  },
  itemBlock: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },
  itemSubtitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Oblique',
    color: '#4b5563',
  },
  itemDate: {
    fontSize: 9,
    color: '#6b7280',
    fontFamily: 'Helvetica',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 4,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#4b5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.5,
  }
});

interface Props {
  data: ResumeData;
}

export const UniversalPDFTemplate: React.FC<Props> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo?.name || 'Your Name'}</Text>
          <View style={styles.contactInfo}>
            {data.personalInfo?.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo?.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo?.location && (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            )}
            {data.personalInfo?.linkedin && (
              <Link src={data.personalInfo.linkedin} style={styles.contactItem}>LinkedIn</Link>
            )}
            {data.personalInfo?.github && (
              <Link src={data.personalInfo.github} style={styles.contactItem}>GitHub</Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                
                {/* Parse description into bullets */}
                {exp.description && (
                  <View style={{ marginTop: 6 }}>
                    {exp.description.split('\n').filter(Boolean).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{bullet.replace(/^[•\-\*]\s*/, '').trim()}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, index) => (
              <View key={index} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {proj.technologies && proj.technologies.join(', ')}
                </Text>
                {proj.description && (
                  <View style={{ marginTop: 6 }}>
                    {proj.description.split('\n').filter(Boolean).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{bullet.replace(/^[•\-\*]\s*/, '').trim()}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.institution}</Text>
                  <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.degree} in {edu.field}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {((data.skills && data.skills.length > 0) || 
          (data.technicalSkills && data.technicalSkills.length > 0) || 
          (data.softSkills && data.softSkills.length > 0)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillPill}>
                {[...(data.skills || []), ...(data.technicalSkills || []), ...(data.softSkills || [])].join(' • ')}
              </Text>
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};
