import { EntryFieldAPI } from "@contentful/app-sdk";
import { useEffect, useState } from "react";

export const useFieldUpdate = (field: EntryFieldAPI) => {
    const [value, setValue] = useState(field.getValue());
  
    useEffect(() => {
      const detach = field.onValueChanged(setValue);
      return () => detach();
    }, [field]);
  
    return value;
  };