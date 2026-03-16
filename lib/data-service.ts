import { supabase } from './supabase';
import { Project, Job, BlogPost, TechItem, Award } from '@/types';

export async function getAwards() {
    const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('display_order', { ascending: true })
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching awards:', error);
        return [];
    }

    return data as Award[];
}

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

export async function getBlogPosts(limit?: number, onlyPublished: boolean = true) {
    let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (onlyPublished) {
        query = query.eq('published', true);
    }

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

export async function getBlogPostById(id: string, onlyPublished: boolean = true) {
    let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id);

    if (onlyPublished) {
        query = query.eq('published', true);
    }

    const { data, error } = await query.single();

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
