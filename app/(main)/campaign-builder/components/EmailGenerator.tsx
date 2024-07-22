'use client'
import { useState, useEffect } from 'react';
import { LeadDetails, Others, Persona } from '../types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FiMail } from 'react-icons/fi'; // Import a mail icon from react-icons

interface EmailGeneratorProps {
  others?: Others;
  persona: Persona|undefined;
  leadDetails: LeadDetails[];
  from: string;
  to: string;
}

export default function EmailGenerator({ others, persona, leadDetails, from, to }: EmailGeneratorProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<string>(''); // State for scheduling
  const [scheduleTime, setScheduleTime] = useState<string>(''); // State for scheduling

  useEffect(() => {
    if (subject || body) {
      console.log('Email updated:', { subject, body });
    }
  }, [subject, body]);

  const generateEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_AI_MICROSERVICE_URI + '/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ others, persona, leadDetails }),
      });

      const data = await response.json();
      setSubject(data.subject);
      setBody(data.body);
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEmailTemplate = () => {
    // Implement the save functionality here
    alert('Email template saved!');
  };

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_URI+'/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, subject, body, scheduleDate, scheduleTime }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Input
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
          placeholder="Email Template Name"
          className="w-full"
        />
        <Button onClick={generateEmail} disabled={isLoading} className="ml-2 flex items-center">
          {isLoading ? 'Generating...' : (
            <>
              <FiMail className="mr-2" />
              Generate Email
            </>
          )}
        </Button>
      </div>
      <div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <div className="flex items-center">
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-grow"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="body">Body:</label>
          <div className="flex items-center">
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={20}
              className="flex-grow"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="scheduleDate">Schedule Date:</label>
        <Input
          id="scheduleDate"
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="w-full"
        />
        <label htmlFor="scheduleTime" className="mt-2">Schedule Time:</label>
        <Input
          id="scheduleTime"
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="w-full"
        />
      </div>
      {(subject.trim() && body.trim()) && (
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={saveEmailTemplate}>Save</Button>
          <Button onClick={sendEmail} disabled={isLoading}>Send Email</Button>
        </div>
      )}
    </div>
  );
}
