import { useContext } from 'react';
import { SchemaContext } from './schemaContext';

export const useSchema = () => {
  const context = useContext(SchemaContext);
  if (context === undefined) {
    throw new Error('useSchema must be used within a SchemaProvider');
  }
  return context;
};
