import { NextRequest, NextResponse } from 'next/server';
import { log, clearLogs } from '@/lib/logger';

export async function POST(req: NextRequest) {
  clearLogs();
  log('Received POST request to /api/scrape');

  try {
    const { url } = await req.json();
    log('Received URL: ' + url);

    if (!url) {
      log('Error: URL is required');
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    log('Fetching content from URL');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();

    log('Extracting links from HTML');
    const links = extractLinks(html, url);

    log('Analyzing content with Modal AI');
    try {
      // Simulating Modal AI analysis for now
      const analysisResults = await simulateModalAIAnalysis(html, links);
      log('Analysis results: ' + JSON.stringify(analysisResults));

      return NextResponse.json({
        analysisResults,
        rawHtml: html,
        links,
      });
    } catch (modalError) {
      log('Error from Modal AI: ' + modalError.stack);
      return NextResponse.json({ 
        error: 'Failed to analyze content with Modal AI', 
        details: modalError.message || 'Unknown error occurred during Modal AI analysis'
      }, { status: 500 });
    }
  } catch (error) {
    log('Unhandled error in /api/scrape: ' + (error instanceof Error ? error.stack : String(error)));
    return NextResponse.json({ 
      error: 'An unexpected error occurred', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

function extractLinks(html: string, baseUrl: string): string[] {
  const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gi;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const link = new URL(match[1], baseUrl).href;
      links.push(link);
    } catch (error) {
      // Ignore invalid URLs
    }
  }
  return links;
}

async function simulateModalAIAnalysis(html: string, links: string[]): Promise<any> {
  // Simulating Modal AI analysis
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
  return {
    summary: "This is a simulated analysis of the webpage content.",
    wordCount: html.split(/\s+/).length,
    linkCount: links.length,
  };
}

