import { supabase } from './supabase';
import { Project, Job, BlogPost, TechItem } from '@/types';

export async function getProjects(limit?: number) {
    let query = supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('year', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data as Project[];
}

export async function getExperiences() {
    const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('year', { ascending: false });

    if (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }

    return data as Job[];
}

export async function getProjectById(id: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching project with id ${id}:`, error);
        return null;
    }

    return data as Project;
}

export async function getBlogPosts(limit?: number) {
    let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return data as BlogPost[];
}

export async function getBlogPostById(id: string) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

    if (error) {
        console.error(`Error fetching blog post with id ${id}:`, error);
        return null;
    }

    return data as BlogPost;
}

export async function getTechStack() {
    const { data, error } = await supabase
        .from('tech_stack')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching tech stack:', error);
        return [];
    }

    return data as TechItem[];
}

export async function getTechStackItemById(id: string) {
    const { data, error } = await supabase
        .from('tech_stack')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching tech stack item with id ${id}:`, error);
        return null;
    }

    return data as TechItem;
}
