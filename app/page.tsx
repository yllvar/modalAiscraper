'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WebScraper() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [rawHtml, setRawHtml] = useState<string>('')
  const [links, setLinks] = useState<string[]>([])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLogs([]);
    setAnalysisResults(null);
    setRawHtml('');
    setLinks([]);
    setIsLoading(true);

    try {
      console.log('Preparing to send request to /api/scrape');
      console.log('URL to scrape:', url);

      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      console.log('Received response:', response);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get("content-type");
      console.log('Content-Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Unexpected content type: ${contentType}`);
      }

      const data = await response.json();
      console.log('Parsed data:', data);

      if (!response.ok || data.error) {
        throw new Error(data.error || data.details || `HTTP error! status: ${response.status}`);
      }

      setAnalysisResults(data.analysisResults);
      setRawHtml(data.rawHtml);
      setLinks(data.links);
    } catch (error) {
      console.error('Error in onSubmit:', error);
      setError(error instanceof Error ? `${error.name}: ${error.message}` : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('Failed to fetch logs: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(fetchLogs, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Web Scraper with Simulated AI Analysis</CardTitle>
          <CardDescription>Enter a URL to scrape content and analyze it</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter URL to scrape"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Scraping and Analyzing...' : 'Scrape and Analyze Content'}
            </Button>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <pre className="whitespace-pre-wrap">{error}</pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList>
              <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
              <TabsTrigger value="html">Raw HTML</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="logs">Process Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {analysisResults ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(analysisResults, null, 2)}</pre>
                ) : (
                  <p>No analysis results available.</p>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="html">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {rawHtml ? (
                  <pre className="whitespace-pre-wrap">{rawHtml}</pre>
                ) : (
                  <p>No raw HTML available.</p>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="links">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {links.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {links.map((link, index) => (
                      <li key={index}>{link}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No links available.</p>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="logs">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {logs.map((log, index) => (
                  <div key={index} className="text-sm">{log}</div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardFooter>
      </Card>
    </div>
  )
}

