export const readingTime = (text: string, wpm: number): { words: number; text: string } => {
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wpm);
    return {
      words: wordCount,
      text: `${minutes} min read`,
    };
  };