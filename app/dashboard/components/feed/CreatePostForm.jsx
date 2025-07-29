
'use client'
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CreatePostForm() {
  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState("Public");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "image/jpeg")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF or JPG file.");
    }
  };

  const handlePublish = () => {
    const postData = {
      content: postContent,
      file: selectedFile ? selectedFile.name : null,
      filter: filter,
    };
    localStorage.setItem("postData", JSON.stringify(postData));
    alert("Post saved successfully!");
  };

  return (
    <Dialog>
      <div className="w-full max-w-5xl h-44 bg-blue-950 flex flex-row items-center p-8 rounded-xl mb-16">
        <section className="w-1/4 h-full flex justify-center items-center">
          <Avatar className="w-32 h-auto border-2 border-blue-500">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section className="w-3/4 h-1/2 flex flex-col items-center space-y-8">
          <DialogTrigger asChild>
            <Input
              type="text"
              placeholder="Que tienes en mente hoy"
              className="bg-white rounded-4xl p-4"
            />
          </DialogTrigger>
          <div className="w-full h-full flex flex-row items-center justify-end pr-4">
          <DialogTrigger asChild>
            <label  className="cursor-pointer text-gray-300 hover:text-white flex items-center space-x-1">
              <span className="icon-[famicons--attach] text-xl"></span>
              <span>Adjuntar</span>
            </label>
          </DialogTrigger>
          <DialogTrigger asChild>
                <button className="ml-4 text-gray-300 hover:text-white flex items-center space-x-1">
                  <span>Filtrar</span>
                  <span className="icon-[material-symbols--arrow-drop-down-circle-outline-rounded] text-xl"></span>
                </button>
          </DialogTrigger>
          </div>
        </section>
        <DialogContent className="sm:max-w-2/5">
          <div className=" w-full border-b-[0.5px] flex justify-center border-gray-400 pb-4">
            <DialogHeader>
              <DialogTitle>Crear Publicación</DialogTitle>
            </DialogHeader>
          </div>
          <div className="w-full flex flex-row items-center justify-center h-auto gap-4">
              <Avatar className="w-15 h-auto border-2 border-blue-500">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            <span className="w-full text-lg">
              Marwin Gaviria / <span className="text-blue-500 font-semibold">Administración</span>
            </span>
          </div>
          <div className="p-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Escribe tu publicación aquí..."
              className="w-full p-2 border rounded"
              style={{ minHeight: "100px", maxHeight: "300px", resize: "vertical" }}
            />
          </div>
          <div className="flex justify-end p-4">
               <div className="w-full h-full flex flex-row items-center justify-end pr-4">
            <label htmlFor="file-attach" className="cursor-pointer text-gray-500 hover:text-blue-950 flex items-center space-x-1">
              <span className="icon-[famicons--attach] text-xl"></span>
              <span>Adjuntar</span>
              <input id="file-attach" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg" />
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-4 text-gray-500 hover:text-blue-950 flex items-center space-x-1 cursor-pointer">
                  <span>Filtrar</span>
                  <span className="icon-[material-symbols--arrow-drop-down-circle-outline-rounded] text-xl"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setFilter("Public")}>Public</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilter("Friends")}>Friends</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilter("Private")}>Private</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
            <Button className={"bg-blue-500 hover:bg-blue-950 cursor-pointer"} onClick={handlePublish}>Publicar</Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
