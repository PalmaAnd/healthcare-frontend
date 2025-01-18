import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Bookmark, Share2 } from 'lucide-react-native';

interface Article {
    id: string;
    title: string;
    summary: string;
    category: string;
    date: string;
    readTime: string;
    imageUrl: string;
}

export default function HealthArticlesFeed() {
    const [articles] = useState<Article[]>([
        {
            id: '1',
            title: 'Understanding Blood Pressure: A Comprehensive Guide',
            summary: 'Learn about the factors affecting blood pressure and how to maintain healthy levels.',
            category: 'Cardiovascular Health',
            date: '2025-01-18',
            readTime: '5 min read',
            imageUrl: '/api/placeholder/400/200'
        },
        {
            id: '2',
            title: 'New Developments in Diabetes Management',
            summary: 'Recent breakthroughs in diabetes treatment and management techniques.',
            category: 'Diabetes',
            date: '2025-01-17',
            readTime: '7 min read',
            imageUrl: '/api/placeholder/400/200'
        },
    ]);

    const renderArticle = ({ item }: { item: Article }) => (
        <View style={styles.articleCard}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.articleImage}
            />
            <View style={styles.articleContent}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
                <View style={styles.articleFooter}>
                    <Text style={styles.metadata}>{item.readTime} • {item.date}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity>
                            <Bookmark size={20} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareButton}>
                            <Share2 size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Health Articles</Text>
            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    articleCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    articleImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    articleContent: {
        padding: 16,
    },
    category: {
        color: '#4169E1',
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summary: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    articleFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metadata: {
        fontSize: 12,
        color: '#999',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareButton: {
        marginLeft: 16,
    },
    form: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    severityButtons: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    severityButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
    }
});