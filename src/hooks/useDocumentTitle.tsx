'use client';

import { useIsomorphicEffect } from '@mantine/hooks';

function useDocumentTitle(title: string): void {
  useIsomorphicEffect(() => {
    window.document.title = title + ' | Travor CMS';
  }, [title]);
}

export default useDocumentTitle;
