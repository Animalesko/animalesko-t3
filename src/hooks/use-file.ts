import { useState } from 'react';

interface FileFileType {
  file: File;
  fileType: string;
}

type MediaType = 'video' | 'image' | 'document';

export function useFile() {
  const [state, setState] = useState<FileFileType | undefined>();

  const setFile = (newFile?: File, fileType?: string) => {
    if (newFile === undefined) {
      setState(undefined);
      return;
    }

    setState({
      file: newFile,
      fileType: fileType ?? newFile.type,
    });
  };

  const file = state?.file;

  const mediaType: MediaType | undefined = state?.fileType.includes('image')
    ? 'image'
    : state?.fileType.includes('video')
    ? 'video'
    : 'document';

  return {
    file,
    setFile,
    mediaType,
  };
}
