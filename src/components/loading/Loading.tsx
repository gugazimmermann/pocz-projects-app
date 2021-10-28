import { ReactElement } from 'react';

export function Loading(): ReactElement {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="mb-4 text-primary-500 font-bold">Carregando...</div>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500" />
    </div>
  );
}

export default Loading;
