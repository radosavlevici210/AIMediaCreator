import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

const advancedFormSchema = z.object({
  projectName: z.string()
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s-_]+$/, "Only alphanumeric characters, spaces, hyphens, and underscores allowed"),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  tags: z.string()
    .transform(val => val.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0))
    .refine(tags => tags.length <= 5, "Maximum 5 tags allowed")
});

type FormData = z.infer<typeof advancedFormSchema>;

interface AdvancedFormValidationProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export default function AdvancedFormValidation({ onSubmit, isLoading = false }: AdvancedFormValidationProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const form = useForm<FormData>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      projectName: "",
      description: "",
      email: "",
      website: "",
      tags: ""
    },
    mode: "onChange"
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setSubmitStatus('idle');
      await onSubmit(data);
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const formErrors = Object.keys(form.formState.errors);
  const hasErrors = formErrors.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Form Validation</CardTitle>
        <CardDescription>
          Comprehensive form with real-time validation and error handling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter project name" 
                      {...field}
                      className={form.formState.errors.projectName ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a unique name for your project (3-50 characters)
                  </FormDescription>
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
                    <Textarea 
                      placeholder="Describe your project..."
                      className={`min-h-[100px] ${form.formState.errors.description ? "border-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description (10-500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        className={form.formState.errors.email ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="url"
                        placeholder="https://example.com"
                        {...field}
                        className={form.formState.errors.website ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="music, ai, creative, production, studio"
                      {...field}
                      className={form.formState.errors.tags ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter up to 5 tags separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitStatus === 'success' && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Form submitted successfully!
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Failed to submit form. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {hasErrors && (
                  <span className="text-red-600">
                    {formErrors.length} validation error{formErrors.length > 1 ? 's' : ''}
                  </span>
                )}
                {!hasErrors && form.formState.isValid && (
                  <span className="text-green-600">All fields are valid</span>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || hasErrors || !form.formState.isDirty}
                className="min-w-[120px]"
              >
                {isLoading ? "Submitting..." : "Submit Form"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}