"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle, User, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  variant?: 'default' | 'compact' | 'expanded';
  showLabels?: boolean;
}

export function ContactForm({ 
  className, 
  onSuccess,
  variant = 'default',
  showLabels = true
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field blur
  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const element = formRef.current?.querySelector(`[name="${firstError}"]`);
      if (element && element instanceof HTMLElement) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTouched({});
      onSuccess?.();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get field status
  const getFieldStatus = (field: string) => {
    if (!touched[field]) return 'idle';
    if (errors[field]) return 'error';
    if (formData[field as keyof typeof formData]) return 'success';
    return 'idle';
  };

  // Input classes based on status
  const getInputClasses = (field: string) => {
    const status = getFieldStatus(field);
    const baseClasses = "transition-all duration-200";
    if (status === 'error') {
      return cn(baseClasses, "border-destructive focus-visible:ring-destructive");
    }
    if (status === 'success') {
      return cn(baseClasses, "border-green-500 focus-visible:ring-green-500");
    }
    return baseClasses;
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={() => handleBlur('name')}
                required
                disabled={isSubmitting || submitSuccess}
                className={cn(getInputClasses('name'), "h-9")}
              />
              {errors.name && touched.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => handleBlur('email')}
                required
                disabled={isSubmitting || submitSuccess}
                className={cn(getInputClasses('email'), "h-9")}
              />
              {errors.email && touched.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <Textarea
                name="message"
                placeholder="Your message..."
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onBlur={() => handleBlur('message')}
                required
                disabled={isSubmitting || submitSuccess}
                className={cn(getInputClasses('message'), "resize-none")}
              />
              {errors.message && touched.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2 bg-destructive/10 text-destructive rounded-lg text-xs">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full gap-2 h-9 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300" 
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Sending...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send
                </>
              )}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 p-3 bg-green-500/10 text-green-500 rounded-lg text-xs text-center border border-green-500/20"
              >
                <CheckCircle className="h-4 w-4 mx-auto mb-1" />
                Thanks for your message!
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  }

  // Expanded variant
  if (variant === 'expanded') {
    return (
      <Card className={cn("overflow-hidden border-primary/10", className)}>
        <CardContent className="p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                {showLabels && (
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </Label>
                )}
                <Input
                  id="name"
                  name="name"
                  placeholder={showLabels ? "John Doe" : "Your name"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onBlur={() => handleBlur('name')}
                  required
                  disabled={isSubmitting || submitSuccess}
                  className={cn(getInputClasses('name'), "h-12 text-base")}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                {showLabels && (
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </Label>
                )}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={showLabels ? "john@example.com" : "your@email.com"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  required
                  disabled={isSubmitting || submitSuccess}
                  className={cn(getInputClasses('email'), "h-12 text-base")}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              {showLabels && (
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Message
                </Label>
              )}
              <Textarea
                id="message"
                name="message"
                placeholder={showLabels ? "Tell me about your project..." : "Your message..."}
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onBlur={() => handleBlur('message')}
                required
                disabled={isSubmitting || submitSuccess}
                className={cn(getInputClasses('message'), "resize-none text-base")}
              />
              {errors.message && touched.message && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground text-right">
                {formData.message.length} characters
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              size="lg"
              className="w-full gap-2 h-14 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300" 
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending Message...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 p-6 bg-green-500/10 text-green-500 rounded-lg text-center border border-green-500/20"
              >
                <CheckCircle className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold">Thanks for your message!</h4>
                <p className="text-sm text-green-500/80 mt-1">
                  I'll get back to you as soon as possible.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Send a Message
        </CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            {showLabels && (
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Name
              </Label>
            )}
            <Input
              id="name"
              name="name"
              placeholder={showLabels ? "Your name" : "Name"}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onBlur={() => handleBlur('name')}
              required
              disabled={isSubmitting || submitSuccess}
              className={getInputClasses('name')}
            />
            {errors.name && touched.name && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.name}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            {showLabels && (
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
            )}
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={showLabels ? "your@email.com" : "Email"}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleBlur('email')}
              required
              disabled={isSubmitting || submitSuccess}
              className={getInputClasses('email')}
            />
            {errors.email && touched.email && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            {showLabels && (
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Message
              </Label>
            )}
            <Textarea
              id="message"
              name="message"
              placeholder={showLabels ? "Tell me about your project..." : "Message..."}
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onBlur={() => handleBlur('message')}
              required
              disabled={isSubmitting || submitSuccess}
              className={cn(getInputClasses('message'), "resize-none")}
            />
            {errors.message && touched.message && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.message}
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300" 
            disabled={isSubmitting || submitSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>

        <AnimatePresence mode="wait">
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-4 bg-green-500/10 text-green-500 rounded-lg text-sm text-center border border-green-500/20"
            >
              <CheckCircle className="h-5 w-5 mx-auto mb-2" />
              Thanks for your message! I'll get back to you soon.
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}