'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UploadCloud, FileText, X } from 'lucide-react';
import AppLayout from '@/components/layouts/app-layout';
import { useToast } from '@/hooks/use-toast';

const uploadSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  author: z.string().min(3, 'Author must be at least 3 characters'),
  description: z.string().min(10, 'Description is too short'),
  document: z.instanceof(File).refine((file) => file.size > 0, 'Document is required.'),
});

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      author: '',
      description: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    form.setValue('document', selectedFile as File);
  };
  
  const removeFile = () => {
    setFile(null);
    form.setValue('document', new File([], ''));
    const fileInput = document.getElementById('document-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log(values);
    toast({
        title: "Upload Successful!",
        description: `"${values.title}" has been uploaded.`
    })
    form.reset();
    removeFile();
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Fill in the details and upload the document file for the library.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Advanced React Patterns'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Jane Doe'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="A brief summary of the book..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document File</FormLabel>
                      <FormControl>
                       <div>
                        <label htmlFor="document-upload" className="relative cursor-pointer">
                            <div className="w-full border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center hover:bg-accent">
                                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground">PDF, EPUB, or MOBI (max. 50MB)</p>
                            </div>
                             <Input
                                id="document-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.epub,.mobi"
                                onChange={handleFileChange}
                            />
                        </label>
                         {file && (
                           <div className="mt-4 flex items-center justify-between rounded-lg border bg-muted/50 p-2">
                             <div className="flex items-center gap-2">
                               <FileText className="h-6 w-6 text-muted-foreground" />
                               <span className="text-sm font-medium">{file.name}</span>
                             </div>
                             <Button type="button" variant="ghost" size="icon" onClick={removeFile}>
                               <X className="h-4 w-4" />
                             </Button>
                           </div>
                         )}
                       </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full btn-gradient" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Uploading...' : 'Upload Document'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
