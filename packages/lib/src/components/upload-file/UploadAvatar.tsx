"use client";
import { useEffect, useRef, useState } from "react";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import Dropzone, { DropzoneRef } from 'react-dropzone'
import { Spinner, Progress, cn, Avatar } from "@nextui-org/react";
import { customAlphabet } from "nanoid";
import { uploadFileToServer } from "../../utils/common.api";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";

export function generateId() {
  /**
   * 需要 url 安全， html 安全的字符，也不能是 - ，因为协同要用
   * url 安全： $-_.+!*'(),
   * html 安全：-_
   */
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', 16)()
}

function UploadAvatar({
  openCount = 0,
  locale = 'en',
  fileName,
  onDone,
}: {
  openCount?: number,
  locale?: string
  fileName?: string
  onDone?: ({url, file} :{url:string, file: any})=>void
}) {

  const accept = "image";
  const [fileUrl, setFileUrl] = useState<string>(fileName || '');

  const [ isUploading, setIsUploading ] = useState(false);

  // const dropzoneRef = createRef<DropzoneRef>();
	const dropzoneRef = useRef<DropzoneRef>(null)

  let initDropzoneAccept = {};
  if (accept === "image") {
    initDropzoneAccept = {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    }
  }

  const [ dropzoneAccept, setDropzoneAccept ] = useState(initDropzoneAccept);
  const amDispatch = useAmDispatch();
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (openCount > 0) {
      dropzoneRef.current && dropzoneRef.current.open();
    }
  }, [openCount])

  const uploadFileApi = uploadFileToServer((progressEvent: any) => {
    setLoaded(progressEvent.loaded);
    setTotal(progressEvent.total);
  });

  const onDropHander = async (acceptedFiles: any) => {
    console.log(acceptedFiles)

    const file = acceptedFiles[0]; // 获取文件
    if (!file) return;

    const formData = new FormData(); // 创建FormData对象
    formData.append('file', file); // 将文件添加到FormData中
    if (accept === "image") {
      formData.append('type', 'picture')
    }
    const filename = file.name

    try {
      setIsUploading(true)
      const response =  await uploadFileApi.send(formData)
      
      if (response.code === 0) {
        onDone && onDone({
          url: response.data.url,
          file: file,
        })
        setFileUrl(response.data.url)
      } else {
        setFileUrl('')
      }

      setIsUploading(false)
    } catch (error) {
      setIsUploading(false)
      amDispatch({
        type: "add",
        payload: "Error",
      })
    }
  }

  return (
    <div className={cn("w-full h-full")}>
      <Dropzone
        ref={dropzoneRef}
        onDrop={onDropHander} 
        accept={dropzoneAccept}
        multiple={false}
      >
        {({getRootProps, getInputProps}) => (
          <section className="w-full h-full rounded-full cursor-pointer overflow-hidden relative" {...getRootProps()}>
            <input {...getInputProps()} />
            {/* <div className="z-10 h-full w-full opacity-50 bg-rose-600 rounded-full justify-center items-center flex absolute top-0 left-0">
            </div> */}
            <div className="z-20 gap-1 h-full w-full justify-center items-center flex absolute top-0 left-0">
              {isUploading ? (
                <Spinner
                  classNames={{circle1: 'border-b-cyan-500', circle2: 'border-b-cyan-500'}}
                />
              ) : (
                <>
                  <ArrowUpTrayIcon className="h-4 w-4" />
                  <div className="text-white text-sm font-normal font-['Inter'] leading-tight">{locale === 'en' ? 'Upload' : '上传'}</div>
                </>
              )}
            </div>
            
            <Avatar isDisabled src={fileName} className="w-full h-full text-large" />
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default UploadAvatar;
