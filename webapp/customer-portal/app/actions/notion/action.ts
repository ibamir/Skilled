'use server'

import { Client } from '@notionhq/client'

const notion = new Client({
    auth: process.env.NOTION_SECRET,
})

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID!
const templateId = process.env.NOTION_TEMPLATE_PAGE_ID!

export async function saveToNotion(answers: Record<string, string>) {
    try {
        if (!dataSourceId || !templateId) {
            throw new Error(
                'Missing Notion data source or template ID configuration.',
            )
        }

        const page = await notion.pages.create({
            parent: {
                type: 'data_source_id',
                data_source_id: dataSourceId,
            },
            template: {
                type: 'template_id',
                template_id: templateId,
            },
            properties: {
                Email: {
                    title: [
                        {
                            text: {
                                content: answers.email || 'No email provided',
                            },
                        },
                    ],
                },
                Role: {
                    rich_text: [
                        {
                            text: {
                                content: answers.role || '',
                            },
                        },
                    ],
                },
                Interest: {
                    rich_text: [
                        {
                            text: {
                                content: answers.interest || '',
                            },
                        },
                    ],
                },
                Content: {
                    rich_text: [
                        {
                            text: {
                                content: answers.content || '',
                            },
                        },
                    ],
                },
                'Other Content': {
                    rich_text: [
                        {
                            text: {
                                content: answers.contentOther || 'N/A',
                            },
                        },
                    ],
                },
                Likelihood: {
                    rich_text: [
                        {
                            text: {
                                content: answers.likelihood || '',
                            },
                        },
                    ],
                },
            },
        })

        return {
            success: true,
            pageId: page.id,
        }
    } catch (error) {
        console.error('Notion API Error:', error)

        return {
            success: false,
            error: 'Failed to create page from template.',
        }
    }
}