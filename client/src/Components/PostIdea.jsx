import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Creat_idea_with_photo } from '../connection/query';

export default function PostIdea() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [work, setWork] = useState(0);
    const [flag, setFlag] = useState(0);
    const [link, setLink] = useState('')
    const [creatideawithphoto] = useMutation(Creat_idea_with_photo);
    const fun = async () => {
        await creatideawithphoto({
            variables: {
                data: {
                    title,
                    desc,
                    askForWork: Number(work),
                    photo: link
                }
            }
        })
        window.location.href = '/youridea';
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {flag === 0 && (
                <div className="bg-slate-600 px-12 py-10 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Post Your Idea</h2>
                    <div className="mb-6">
                        <input
                            placeholder="Title..."
                            className="bg-slate-500 text-white px-4 py-3 rounded-md w-full"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                            onClick={() => setFlag(1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {flag === 1 && (
                <div className="bg-slate-600 px-12 py-10 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Post Your Idea</h2>
                    <div className="mb-6">
                        <textarea
                            placeholder="Description..."
                            className="bg-slate-500 text-white px-4 py-3 rounded-md w-full h-24 resize-none"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                            onClick={() => setFlag(2)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {flag === 2 && (
                <div className="bg-slate-600 px-12 py-10 rounded-3xl max-w-96 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Post Your Idea</h2>
                    <div className="mb-6">
                        <textarea
                            placeholder="Photo Link..."
                            className="bg-slate-500 text-white px-4 py-3 rounded-md w-full h-12 resize-none"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        ></textarea>
                        <a href='https://www.atatus.com/tools/image-to-url' target="_blank" className='text-sm font-light hover:text-red-500'>Photo to link</a>
                        <p className='text-sm font-light'>We are working on this feature. You can also skip this step.</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                            onClick={fun}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}