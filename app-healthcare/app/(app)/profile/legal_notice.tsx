import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LegalNotice = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Legal Notice</Text>
                <Text style={styles.lastUpdated}>Last Updated: January 16, 2025</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Service Provider Information</Text>
                    <Text style={styles.text}>
                        Healthcare Solutions GmbH{'\n'}
                        Technikstraße 15{'\n'}
                        5020 Salzburg{'\n'}
                        Austria
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Contact Details</Text>
                    <Text style={styles.text}>
                        Phone: +43 1 234 567 890{'\n'}
                        Email: office@Healthcare-solutions.at{'\n'}
                        Website: www.Healthcare-solutions.at
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Commercial Register Information</Text>
                    <Text style={styles.text}>
                        Commercial Register Number: FN 123456a{'\n'}
                        Commercial Court: Salzburg{'\n'}
                        VAT ID: ATU12345678
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Regulatory Authority</Text>
                    <Text style={styles.text}>
                        Supervisory Authority: Vienna City Administration{'\n'}
                        Professional Association: Austrian Chamber of Commerce{'\n'}
                        Applicable Trade Regulations: Available at www.ris.bka.gv.at
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Data Protection</Text>
                    <Text style={styles.text}>
                        Our services are subject to Austrian and European data protection laws (GDPR). For detailed information about how we process your personal data, please refer to our Privacy Policy.{'\n\n'}
                        Data Protection Officer:{'\n'}
                        Jane Doe{'\n'}
                        Email: privacy@Healthcare-solutions.at
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>6. Professional Liability Insurance</Text>
                    <Text style={styles.text}>
                        Insurance Provider: Austrian Insurance AG{'\n'}
                        Policy Number: POL-123456{'\n'}
                        Geographic Coverage: European Union
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>7. Online Dispute Resolution</Text>
                    <Text style={styles.text}>
                        The European Commission provides a platform for online dispute resolution (OS) which is available at: https://ec.europa.eu/consumers/odr/{'\n\n'}
                        Our email address for dispute resolution: dispute@Healthcare-solutions.at
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>8. Disclaimer</Text>
                    <Text style={styles.text}>
                        Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.{'\n\n'}
                        All information in this application is provided without guarantee of correctness, completeness, or currentness.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>9. Copyright</Text>
                    <Text style={styles.text}>
                        © 2025 Healthcare Solutions GmbH. All rights reserved.{'\n\n'}
                        The content and works created by us on these pages are subject to Austrian copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        paddingVertical: 8,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
});

export default LegalNotice;