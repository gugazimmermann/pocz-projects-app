import {
  AudioIcon, VideoIcon, TextIcon, SheetIcon, PresentationIcon, ZipIcon, FileUnknowIcon, PdfIcon,
} from '@icons';
import { IAttachmentFile } from '@interfaces';
import { formatBytes } from '@libs';

function imgPreview(
  type: 'IMG' | 'ICON',
  src: string,
  path: string,
  size: number,
  i: number,
) {
  const iconFile = (icon: string) => {
    switch (icon) {
      case 'audio':
        return <AudioIcon styles="w-6 text-primary-500" stroke={2} />;
      case 'video':
        return <VideoIcon styles="w-6 text-primary-500" stroke={2} />;
      case 'doc':
        return <TextIcon styles="w-6 text-primary-500" stroke={2} />;
      case 'sheet':
        return <SheetIcon styles="w-6 text-primary-500" stroke={2} />;
      case 'presentation':
        return <PresentationIcon styles="w-6 text-primary-500" stroke={2} />;
      case 'zip':
        return <ZipIcon styles="w-6 text-primary-500" stroke={2} />;
      case 'pdf':
        return <PdfIcon styles="w-6 text-primary-500" stroke={2} />;
      default:
        return <FileUnknowIcon styles="w-6 text-primary-500" stroke={2} />;
    }
  };
  return (
    <div key={i} className="space-x-4 flex flex-row items-center justify-start">
      {type === 'IMG' ? <img src={src} alt={path} width={21} /> : iconFile(src)}
      <div className="w-full flex items-center justify-between">
        <div className="overflow-hidden truncate text-sm">{path}</div>
        <div className="text-sm">{formatBytes(size)}</div>
      </div>
    </div>
  );
}

export function AttachmentUploadDetails(file: IAttachmentFile, i: number) {
  const {
    type, preview, path, size,
  } = file;
  if (type.split('/')[0] === 'image') {
    return imgPreview('IMG', preview, path, size, i);
  } if (type.split('/')[0] === 'audio') {
    return imgPreview('ICON', 'audio', path, size, i);
  } if (type.split('/')[0] === 'video') {
    return imgPreview('ICON', 'video', path, size, i);
  } if (
    type === 'application/json'
    || type === 'text/plain'
    || type === 'application/msword'
    || type
      === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    || type === 'application/vnd.oasis.opendocument.text'
  ) {
    return imgPreview('ICON', 'doc', path, size, i);
  } if (
    type === 'application/vnd.oasis.opendocument.spreadsheet'
    || type === 'application/vnd.ms-excel'
    || type
      === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return imgPreview('ICON', 'sheet', path, size, i);
  } if (
    type === 'application/vnd.ms-powerpoint'
    || type
      === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    || type === 'application/vnd.oasis.opendocument.presentation'
  ) {
    return imgPreview('ICON', 'presentation', path, size, i);
  } if (
    type === 'application/vnd.rar'
    || type === 'application/zip'
  ) {
    return imgPreview('ICON', 'zip', path, size, i);
  } if (type === 'application/pdf') {
    return imgPreview('ICON', 'pdf', path, size, i);
  }
  return <div />;
}
