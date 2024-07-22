import { useEffect, useState } from 'react';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { Persona } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface PersonaSelectorProps {
  onSelect: (persona: Persona) => void;
}

export default function PersonaSelector({ onSelect }: PersonaSelectorProps) {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    const fetchPersonas = async () => {
      const { data, error } = await supabase
        .from('ai_personas')
        .select(`
          id,
          persona_description,
          persona_name,
          persona_description,
          persona_company,
          persona_services
        `);

      if (error) {
        console.error('Error fetching personas:', error);
      } else {
        setPersonas(data);
        setSelectedPersona(data[0]);
        onSelect(data[0]);
      }
    };

    fetchPersonas();
  },);

  const handleSelect = (value: any) => {
    const selected = personas.find(p => p.persona_description === value) || personas[0];
    setSelectedPersona(selected);
    onSelect(selected);
    console.log(selected);
  };

  return (
    <>
      {/* <Label htmlFor="persona">Select AI Persona: </Label> */}
      <Select value={selectedPersona ? selectedPersona.persona_description??'' : ''} onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a persona" />
        </SelectTrigger>
        <SelectContent>
          {personas.map((persona) => (
            <SelectItem key={persona.id} value={persona.persona_description??''}>
              {persona.persona_name} - {persona.persona_description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
