import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_Request, GetAllIdea_withPhoto, Like_Idea, ME, MOST_LIKED, TOP_FUNDED } from '../connection/query'
import { marked } from 'marked';

import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyAHTACLKtynVPTrG7Lz5K1iuP8KgCRbCC8");

export default function Landing() {
    const { data: d3 } = useQuery(ME);
    const { data: d1, refetch } = useQuery(GetAllIdea_withPhoto);
    const { data: d2 } = useQuery(ALL_Request, {
        variables: {
            data: d3?.me?.id
        }
    });
    const { data: d4 } = useQuery(MOST_LIKED);
    const { data: d5 } = useQuery(TOP_FUNDED);
    let flag = 0;
    if (d2?.allRequest_singleUser?.length > 0) {
        flag = 1;
    }
    const [like] = useMutation(Like_Idea);
    const handleLike = async (IdeaID) => {
        try {
            await like({
                variables: {
                    data: {
                        on: IdeaID
                    }
                }
            });
            refetch();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    const truncateString = (str, num) => {
        return str.length > num ? str.slice(0, num) + " . . ." : str
    };


    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [show, setShow] = useState(0)
    async function fun(e) {
        e.preventDefault();
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(question);
        setAnswer(result.response.text())
        setShow(1);
    }
    const parseResponse = (text) => {
        const html = marked(text);
        return <div dangerouslySetInnerHTML={{ __html: html }} className='parsed-content' />;
    };

    return (
        <div className='mt-10 mx-32'>
            <div className='flex'>
                <div className='flex-1'>
                    <div className='m-10 pt-1 bg-slate-600 text-black opacity-95 h-56 max-w-80 rounded-3xl'>
                        <div>
                            <a href="/youridea">
                                <p className='text-2xl hover:text-yellow-100 transition-all font-thin  m-2 pt-5'>- Your ideas</p>
                            </a>
                        </div>
                        <div>
                            <a href={`/singleidea/${d4?.get_top_like}`}>
                                <p className='text-2xl hover:text-yellow-100 transition-all font-thin  m-2'>- Top liked</p>
                            </a>
                        </div>
                        <div>
                            <a href={`/singleidea/${d5?.get_top_funded}`}>

                                <p className='text-2xl hover:text-yellow-100 transition-all font-thin m-2'>- Top funded</p>
                            </a>
                        </div>
                        <div>
                            <a href="/friend">
                                {flag == 0 ? <></> : <div className="relative">
                                    <span className="absolute top-3 animate-pulse  left-24 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                </div>}
                                <p className='text-2xl hover:text-yellow-100 transition-all font-thin m-2'>- Friends</p>
                            </a>
                        </div>
                    </div>
                    <a href="/buy">
                        <div className='flex bg-blue-600 max-w-80 m-10 rounded-2xl h-10 -mt-5 -mb-5 justify-center'>
                            <p className=' text-xl mt-1'>Buy token</p>
                        </div>
                    </a>
                    <div className='m-10 h-20 max-w-80 rounded-3xl'>
                        <form className="max-w-md mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-400 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input onChange={(e) => { setQuestion(e.target.value) }} type="search" id="default-search" className="block w-full p-4 ps-10 rounded-3xl text-sm text-gray-400 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask Ai for ideas..." required />
                                <button onClick={fun} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-3xl dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>

                    </div>
                    {show === 0 ? null : (
                        <div className='mx-10 scroll-smooth -mt-14 overflow-y-auto max-h-80 bg-slate-600 text-black h-auto max-w-md rounded-3xl shadow-lg p-4 border border-gray-300'>
                            <p className='text-xl text-black font-semibold'>AI Response</p>
                            <div className='h-[2px] w-full bg-black mb-2'></div>
                            <p>
                                {parseResponse(answer)}
                            </p>
                        </div>
                    )}
                </div>
                <div className='flex-[2] max-h-[680px] overflow-y-auto'>
                    {d1?.allIdea?.map((idea, index) => (
                        <div key={index} className='bg-slate-600 relative mt-10 flex min-h-44 rounded-3xl'>
                            <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-12 border-black rounded-full'>
                                <p className='h-11 pl-[12px] pt-[2px] text-3xl text-black w-11 rounded-full'>{idea.by.userName.charAt(0).toUpperCase()}</p>
                            </div>
                            <div className='mt-5 ml-5'>
                                <a href={`/singleidea/${idea.id}`}>
                                    <div className='flex'>
                                        <p className='text-black font-semibold text-xl'>{idea.title}</p>
                                        <p className='text-gray-800 font-semibold text-md pt-1 ml-2'>~{idea.by.userName}</p>
                                    </div>
                                </a>
                                <div className='flex mt-2'>
                                    <div className='flex'>
                                        {idea.photos.length > 0 && (
                                            <img className='h-20 absolute z-20 w-20 rounded-2xl' src={idea.photos[0].link} alt="photo" />
                                        )}
                                        {idea.photos.length > 1 && (
                                            <img className='h-20 w-20 mt-1 ml-2 rounded-2xl' src={idea.photos[1].link} alt="photo" />
                                        )}
                                    </div>
                                    {idea.photos.length === 0 && (<div className='text-black font-semibold'>{truncateString(idea.desc, 5000)}</div>)}
                                    {idea.photos.length === 1 && (<div className=' ml-[100px] text-black font-semibold'>{truncateString(idea.desc, 2000)}</div>)}
                                    {idea.photos.length > 1 && (<div className=' ml-7 text-black font-semibold'>{truncateString(idea.desc, 100)}</div>)}
                                </div>
                                <div className='flex absolute bottom-0'>
                                    <div className='flex'>
                                        <div onClick={() => handleLike(idea.id)}>
                                            <img className="h-5 w-5 hover:cursor-pointer hover:filter hover:invert hover:sepia hover:saturate-100 hover:hue-rotate-180 hover:brightness-200" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFLUlEQVR4nO2dWYgcRRjHf2a97xiD2RjFEASVBDSSoIJ4ICtBFMxLFE8QYiKIYBQ8EXwJaDzABzWaoBIQZQVFUVGiiMEX8+CZqPEgaLyPjVnNrhpHiq3FyaS/6pqZqq7pqe8H9TJM93z1/3dXV1V/VQOKoiiKUj9OBd4BxoBPgXXAUmBa6sBy4EjgV6BRUP4CXgTOSB1kP3OLIH5reRWYnzrYfuQTTwNM+Ru4C5iSOuh+4fQ2xG8uw8D+qYPvB1Z3aEDDPhv2Tl2BOnMAMCKI+zXwj4cJD6auRJ25TBB1HJhuu6B3OnpIpvwLLEpdkbryuiDqcy3fmwW85TDhK2DfRHWoLccCuwRBLyz4/gDwpMOE5QnqUGvuEIT83vFgNZ9vEI77oOL4a81ewBZByFUlx85z3DknVxR/7TnT0ZTM9Tj+FeHYmyuIvS9YIwj4rufxSx2DM6WEg4DfBQGvw4/5wvGbPI/PmqscfX/fqedpjge4UsKbgnjP4M8+DhMVBwvsyLVIvEVtNmNF5xht4xzZcSXwhyDcN3ag5css4TzbIsZfWw62rxcbjrKyg9eX+hD2YB6wuUR8M+N5fKBJvNfaPE9fcw3wZ4n4DTvb2S4rhXPp1DQTD8inPITfYa/kTnhbOOe1ZM5cOxgqE99MnJ3QhcHjwnlPIfNezqiH+ObuOLCL31ksnPeXXF/UmyvyCc8m5/IAv7fO8yVOFphm5GMP8T/soslpZqrjwX4FmWHE+NZD/DVdNjnN3CD8hklnPIwac45ND9kstOO/2TdRy5reva4oEX7UPhdCMcVjTNFJGbXnfdnOxh5NhcwB1rcZ8OfA2bZZkb7zEXBi4FgvjiC+lHn3MDCDyJhk1587DFKaUGsAawM2Oc08XZEBk2UkZrrLnC7El8o4cHWsgBMYMDlNYprd4LTb7PiU64nL+SV3XkwTgt4J50YKdCrVvE3bksCIkZDPhNWOrtyNwGDBMYO21zPmCLLOA8mFwP3ATkf9zIM5ai6+EbiMm/rQgNa5rK2O3tFMAiBlJBRd+a0M9rkBkybsjJn+2K2A/W6A4QGhji8RADWgnIWCTmbE3DVqgN977CKdTPPdNWpA4qZWDfBDDUiMGpAYNSAxakDiFTxqQEKmx0z+1V5QOWcJOn1BANSAch4SdHqBAKgBbg4Htgs6mayMrlED3NzmmI4OkjGhBsiY7W++i515pwbILHfocxqBUAOKGXCs3jdJDMFQA4pZ4tBmiICoAcVsFLR5z46Mg6EG7MmQQ5dLCIwa4J+o9mWMPenUgD0Xj1e6CZQasDvDgiY/2E0Fg6MG7J6kLO3MaEbEUVAD/ucxR/ZDtFxXNWCCGY4MuHuJiBowwT2O3dqPISJqABzq2LH38ZjiqwET3CqIb9YdnERkcr8D9nMsr61ksXfuBixz1MFspR+dnA0YAD4T4n+jqiByNmCJI36zCLAScjZgoxD7+6GnnF3kasCQI/ZLqwwkVwPWVznl7CJHAxY44vbdLjkYORrwvGPKOca+FtGWqc50GDBIb3KRI+bbUwQUa6H2CnqPC+xWaUXxmgvxiBRBPSoENGZF7HSrgjHH8VVyFHAe8GzJ32DdnXJ3rEbmZatditpzfx+VQxkPmWbYKccBP2Yq/mJ6BDPz91MXldkUaRO9RqSyza586Slm2x3H26nILrsV5SG2rHX8rVSjB8qY3Xyjp/+Z21wZj9iruqjbtt3u97zKbknfivnsPvsdaZxRVdlhd3YctolVSbqaiqIoiqIoiqKQDf8BZS818Cu6IisAAAAASUVORK5CYII=" alt="like" />
                                        </div>
                                        <p className='ml-1 text-black'>{idea.like}</p>
                                    </div>
                                    <div className='flex'>
                                        <img className="h-5 ml-5 w-5 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPklEQVR4nO2ZV2hUQRSGP2MNIjZEJCpYsYXYwGAHUUR9saCgKCi+iBoloOKjBBQRxbxYsOCzNYJgB9FgeQjYxd6NiEYjSuwrR/6FQTbZu9nNzgTywTzcmTnn/ufuTjsDDcdw4A4QU7kNDKMRcsUJIl4u00joCWwBKoA/Et9CJaY6a9sMdCdQioHvCX6FOP/XfwNWExgbnS9eBsyuI5AFwGnnuYRAmKYAfgBznPraAokzH/gp26l4Jge4J4Fr/mtLFoix1pnRmuGRSRLyFGhVj0DM5pnqJ+CRUonYkKAtSiDI1uq3EcBaMTZB2yXgYh3PccbJh7V745VEdEzDR2f5eIEHOgBnJKBGg76+5GhNMV82LbfHw9j4CKzMgD/z8UE+t5NFnuilEzPoc7x8PiaL1Oil5cA+YJVW89FAb6CXxo07duLPvVUKgZlAkX4F8xX/q2aNygR7p0yVSrKM7V736uU3gWP6qveB10AVUO0IrFbdG/Up176sQu0ngDw8MUMiTqbh46h8LMYjUyTis84cqWJblE/yMR2PnJOIdfXc9JnNevkwX964KxEFafgokA8733vjkEQsScPHUvk4iEcWScRzHXVTpVi25mMhHmkOHNYprzrFPVeOMz0fkS/vXJegwSnY5MvGTpjBUCpRloSIyibZ7CIgRkiUrdxdIvTv5Ox2xxAYZRJ2QYel2mjnpIPOEiB5wFsJtJ1tbQxQH1vR+xAoFRECGaQ+jwiYWxECGag+LwmYhxI5JEmi2/q8I1C6Al8kskcd/dprAf2uoIIiH7ihIE5F6H/QWQxHEgCDgZ1KYJuwB0C3CHadle81m1/AfmAoWcYOULOA885lzm/ggPJdUbH1ZI9sY062cS7QsgH10wZY4exWrXwFdicZ3MmwWWyHM75iymBaZiY3g/r/neKWKKHgXmwWpZkqTTQJLHfGWkyJiqWZuHJoCxx3HF/N0qXMZF2cxt9bJi31orWy5+boPTCP7LPQ+ctdTHAHE4ntzgrcH79T+0tp2ZqqcT/d79mMMgr/FEqLTfN9UzEs0Rewq4NQOFvH7VitXJPRMsJhmTPhROZjAyap0y1VUYPIDUBsLEmxxbmJJpogOn8BqLl1Pd/gsuQAAAAASUVORK5CYII=" alt="worker" />
                                        <p className='ml-1 text-black'>{idea.worker}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}
