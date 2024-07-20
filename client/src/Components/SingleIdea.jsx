import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Accept_work, Add_Photo, Ask_for_work, CHECK_FOR_WORKER, Check_friend, Get_All_askingfor_work, GET_ALL_COMMENT, GET_id_from_Idea, GetAllIdea_SingleUser, GetYourSingleIdea_withPhoto, GIVE_TOKEN, MAKE_COMMENT, ME, Send_friend_request } from '../connection/query'
import { useParams } from 'react-router-dom';

export default function SingleIdea() {
    const { id } = useParams();
    const { data: d3 } = useQuery(ME);
    const { data: d1, loading: l1, error: e1, refetch: r1 } = useQuery(GetYourSingleIdea_withPhoto, {
        variables: {
            data: id
        }
    });
    const { data: d2, loading: l2, error: e2 } = useQuery(GetAllIdea_SingleUser, {
        variables: {
            data: id
        }
    });
    const { data: d5 } = useQuery(GET_id_from_Idea, {
        variables: {
            data: id
        }
    })
    const { data: d6 } = useQuery(Check_friend, {
        variables: {
            data: d5?.get_user_id_form_idea
        }
    })
    const [link, setLink] = useState('');
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('')
    const [token, setToken] = useState(0)
    const [addphoto] = useMutation(Add_Photo);
    const [accpetswork] = useMutation(Accept_work)
    const [askwork] = useMutation(Ask_for_work)
    const [friend_request] = useMutation(Send_friend_request);
    const [makecomment] = useMutation(MAKE_COMMENT);
    const [givetoken] = useMutation(GIVE_TOKEN);
    const { data: d4, loading: l3, error: e3, refetch: r2 } = useQuery(Get_All_askingfor_work, {
        variables: {
            data: id
        }
    });
    const { data: d7 } = useQuery(CHECK_FOR_WORKER, {
        variables: {
            data: {
                on: id
            }
        }
    })
    const { data: d8, refetch: r4 } = useQuery(GET_ALL_COMMENT, {
        variables: {
            data: id
        }
    })
    let flag = 0;
    if (l1) return <p className='text-black text-2xl text-center'>Loading...</p>;
    if (e1) return <p>Error: {e1.message}</p>;
    if (l2) return <p className='text-black text-2xl text-center'>Loading...</p>;
    if (e2) return <p>Error: {e2.message}</p>;
    if (l3) return <p className='text-black text-2xl text-center'>Loading...</p>;
    if (e3) return <p>Error: {e2.message}</p>;

    if (d3.me.userName === d1.singleIdea.by.userName) {
        flag = 1;
    }
    const fun = async () => {
        try {
            await addphoto({
                variables: {
                    data: {
                        by: d3?.me?.id,
                        on: id,
                        link
                    }
                }
            });
            r1();
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };
    const givtok = async () => {
        try {
            await givetoken({
                variables: {
                    data: {
                        to: id,
                        token: Number(token)
                    }
                }
            });
            r1();
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };
    const comnt = async () => {
        try {
            await makecomment({
                variables: {
                    data: {
                        on: id,
                        name
                    }
                }
            });
            r4()
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };
    const ask = async () => {
        try {
            await askwork({
                variables: {
                    data: {
                        on: id,
                        msg
                    }
                }
            });
            alert("you request has been send")
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };
    const frd_req = async () => {
        try {
            await friend_request({
                variables: {
                    data: d5?.get_user_id_form_idea
                }
            });
            alert("Friend request send!")
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };
    const acc = async (userid) => {
        try {
            await accpetswork({
                variables: {
                    data: {
                        on: id,
                        by: userid
                    }
                }
            });
            r2();
            r1();
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };

    const truncateString = (str, num) => {
        return str.length > num ? str.slice(0, num) + " . . ." : str
    };

    return (
        <div className='mt-10 mx-32'>
            <div className='flex'>
                <div className='flex-1'>
                    <div className='m-10  relative bg-slate-400 text-black opacity-90 h-[287px] min-w-96 max-w-96 rounded-3xl'>
                        <div className='text-center bg-slate-300 rounded-3xl'>
                            <p className='text-2xl'>Comments</p>
                            <div className='h-[2px] bg-black min-w-96'></div>
                        </div>
                        {flag == 0 ?
                            <div className='max-h-[190px] overflow-y-auto'>
                                {d8?.get_all_comment?.map((idea, index) => (
                                    <div key={index}>
                                        <div className='flex min-h-5 m-[2px] bg-gray-300 rounded-2xl'>
                                            <div className='flex m-1'>
                                                <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-9 w-9 border-black rounded-full'>
                                                    <p className='h-8 pl-[8px] pt-[1px] text-[20px] text-black w-11 rounded-full'>{idea.by.userName.charAt(0).toUpperCase()}</p>
                                                </div>
                                                <div className='h-auto ml-3 w-[1px] bg-black'></div>
                                            </div>
                                            <div className='ml-3'>
                                                <div className='flex justify-between'>
                                                    <p className='text-md font-semibold'>{idea.by.userName}</p>
                                                </div>
                                                <p className='text-md min-w-72 max-w-72'>{idea.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='h-[2px] absolute bottom-[59px] bg-black min-w-96'></div>
                                <div className='pt-[10px]  pl-2 absolute bottom-0 pb-1'>
                                    <input type="text" className='rounded-l-2xl h-[51px] max-w-80 min-w-80 bg-slate-500' onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                    <button onClick={comnt} className='bg-blue-600 opacity-95 rounded-r-2xl pr-1 ml-[2px] pl-1 py-[11px] text-xl'>send</button>
                                </div>
                            </div>
                            :
                            <div className='max-h-[240px] overflow-y-auto'>
                                {d8?.get_all_comment?.map((idea, index) => (
                                    <div key={index}>
                                        <div className='flex min-h-5 m-[2px] bg-gray-300 rounded-2xl'>
                                            <div className='flex m-1'>
                                                <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-9 w-9 border-black rounded-full'>
                                                    <p className='h-8 pl-[8px] pt-[1px] text-[20px] text-black w-11 rounded-full'>{idea.by.userName.charAt(0).toUpperCase()}</p>
                                                </div>
                                                <div className='h-auto ml-3 w-[1px] bg-black'></div>
                                            </div>
                                            <div className='ml-3'>
                                                <div className='flex justify-between'>
                                                    <p className='text-md font-semibold'>{idea.by.userName}</p>
                                                </div>
                                                <p className='text-md min-w-72 max-w-72'>{idea.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    {flag == 0 ?
                        <div>
                            <div className='mx-10 -mt-8 bg-slate-400 text-black opacity-90 h-20 min-w-96 max-w-96 rounded-3xl'>
                                <div className='text-center bg-slate-300 rounded-3xl'>
                                    <p className='text-2xl'>Ask Work</p>
                                    <div className='h-[2px] bg-black min-w-96'></div>
                                </div>
                                {d7?.work_or_not ?
                                    <div className='flex justify-center'>
                                        <p className='text-lg mt-2'>You are already a part of this idea</p>
                                    </div> : <div className='flex'>
                                        <input onChange={(e) => {
                                            setMsg(e.target.value);
                                        }} className='mt-1 ml-3 p-[7px] min-w-[300px] bg-slate-500 max-w-[300px] rounded-l-2xl' type="text" placeholder='message...' />
                                        <button onClick={ask} className='bg-blue-600 opacity-95 text-xl mt-1 ml-1 pr-2 pl-1 rounded-r-2xl'>send</button>
                                    </div>}
                            </div>
                            <div className='mx-10 mt-2 bg-slate-400 text-black opacity-90 h-[287px] min-w-96 max-w-96 rounded-3xl'>
                                <div className='text-center bg-slate-300 rounded-3xl'>
                                    <p className='text-2xl'>{`${d1.singleIdea.by.userName} idea's`}</p>
                                    <div className='h-[2px] bg-black min-w-96'></div>
                                </div>
                                <div className='max-h-[220px] mt-2 overflow-y-auto'>
                                    {d2?.allIdea_signleUser?.map((idea, index) => (
                                        <a key={index} href={`/singleidea/${idea.id}`}>
                                            <div className='flex min-h-5 m-1 bg-gray-300 hover:bg-slate-500 rounded-2xl'>
                                                <div className='flex m-1'>
                                                    <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-9 w-9 border-black rounded-full'>
                                                        <p className='h-8 pl-[8px] pt-[1px] text-[20px] text-black w-11 rounded-full'>{d1?.singleIdea?.by?.userName.charAt(0).toUpperCase()}</p>
                                                    </div>
                                                    <div className='h-10 ml-3 w-[1px] bg-black'></div>
                                                </div>
                                                <div>
                                                    <div className='ml-3 flex '>
                                                        <p className='text-lg  font-semibold'>{idea.title}</p>
                                                    </div>
                                                    <div className='ml-3'>
                                                        <p className='text-sm'>{truncateString(idea.desc, 40)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        : <div className='m-10 bg-slate-400 text-black opacity-90 h-80 min-w-96 max-w-96 rounded-3xl'>
                            <div className='text-center bg-slate-300 rounded-3xl'>
                                <p className='text-2xl'>Want work</p>
                                <div className='h-[2px] bg-black min-w-96'></div>
                            </div>
                            <div className='max-h-64 mt-2 overflow-y-auto'>
                                {d4?.allaskingfor_work.length == 0 ?
                                    <p className=' flex justify-center text-2xl'>The queue is Empty</p>
                                    : d4?.allaskingfor_work?.map((idea, index) => (
                                        <div className='flex min-h-5 m-1 bg-gray-300 hover:bg-slate-500 rounded-2xl'>
                                            <div className='flex m-1'>
                                                <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-11 w-11 border-black rounded-full'>
                                                    <p className=' pl-[8px] text-[24px] text-black w-11 rounded-full'>{idea.from.userName.charAt(0).toUpperCase()}</p>
                                                </div>
                                                <div className='h-10 ml-3 w-[1px] bg-black'></div>
                                            </div>
                                            <div>
                                                <div className='flex'>
                                                    <div onClick={() => acc(idea.from.id)}>
                                                        <img className="h-5 w-5 mt-1 hover:cursor-pointer hover:filter hover:invert hover:sepia hover:saturate-100 hover:hue-rotate-180 hover:brightness-200" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPklEQVR4nO2ZV2hUQRSGP2MNIjZEJCpYsYXYwGAHUUR9saCgKCi+iBoloOKjBBQRxbxYsOCzNYJgB9FgeQjYxd6NiEYjSuwrR/6FQTbZu9nNzgTywTzcmTnn/ufuTjsDDcdw4A4QU7kNDKMRcsUJIl4u00joCWwBKoA/Et9CJaY6a9sMdCdQioHvCX6FOP/XfwNWExgbnS9eBsyuI5AFwGnnuYRAmKYAfgBznPraAokzH/gp26l4Jge4J4Fr/mtLFoix1pnRmuGRSRLyFGhVj0DM5pnqJ+CRUonYkKAtSiDI1uq3EcBaMTZB2yXgYh3PccbJh7V745VEdEzDR2f5eIEHOgBnJKBGg76+5GhNMV82LbfHw9j4CKzMgD/z8UE+t5NFnuilEzPoc7x8PiaL1Oil5cA+YJVW89FAb6CXxo07duLPvVUKgZlAkX4F8xX/q2aNygR7p0yVSrKM7V736uU3gWP6qveB10AVUO0IrFbdG/Up176sQu0ngDw8MUMiTqbh46h8LMYjUyTis84cqWJblE/yMR2PnJOIdfXc9JnNevkwX964KxEFafgokA8733vjkEQsScPHUvk4iEcWScRzHXVTpVi25mMhHmkOHNYprzrFPVeOMz0fkS/vXJegwSnY5MvGTpjBUCpRloSIyibZ7CIgRkiUrdxdIvTv5Ox2xxAYZRJ2QYel2mjnpIPOEiB5wFsJtJ1tbQxQH1vR+xAoFRECGaQ+jwiYWxECGag+LwmYhxI5JEmi2/q8I1C6Al8kskcd/dprAf2uoIIiH7ihIE5F6H/QWQxHEgCDgZ1KYJuwB0C3CHadle81m1/AfmAoWcYOULOA885lzm/ggPJdUbH1ZI9sY062cS7QsgH10wZY4exWrXwFdicZ3MmwWWyHM75iymBaZiY3g/r/neKWKKHgXmwWpZkqTTQJLHfGWkyJiqWZuHJoCxx3HF/N0qXMZF2cxt9bJi31orWy5+boPTCP7LPQ+ctdTHAHE4ntzgrcH79T+0tp2ZqqcT/d79mMMgr/FEqLTfN9UzEs0Rewq4NQOFvH7VitXJPRMsJhmTPhROZjAyap0y1VUYPIDUBsLEmxxbmJJpogOn8BqLl1Pd/gsuQAAAAASUVORK5CYII=" alt="worker" />
                                                    </div>
                                                    <p className='text-lg ml-2 font-semibold'>{idea.from.userName}</p>
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='text-sm'>{truncateString(idea.msg, 40)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                        </div>}
                </div>
                <div className='flex-[2]'>
                    <div className='bg-slate-600 relative mt-10 flex min-h-[670px] min-w-[800px] rounded-3xl'>
                        <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-11 w-11 border-black rounded-full'>
                            <p className=' pl-[12px] text-[30px] text-black w-11 rounded-full'>{d1.singleIdea.by.userName.charAt(0).toUpperCase()}</p>
                        </div>
                        <div className='mt-5 ml-5'>
                            <div className='flex'>
                                <p className='text-black font-semibold text-2xl'>{d1.singleIdea.title}</p>
                                <p className='text-gray-800 font-semibold text-lg pt-1 ml-2'>~{d1.singleIdea.by.userName}</p>
                                {d6?.check_friends === true ?
                                    <></>
                                    : <div className='ml-28'>
                                        <div onClick={frd_req} className='bg-blue-600 p-2 hover:cursor-pointer rounded-2xl'>
                                            <img className='h-7 w-7' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACd0lEQVR4nO2WTYiNURjHfxpcck2T1ISVJfKRGoPsLMjCkKKs2RA2s7eRhciYOxtsZKNsJLFgw8p3DUMjiRgroZl8zBXj6tH/1Jkz57zve827sLj/eur0Pl//5znPc+6FFlpo4T9FBTgE3AO+Ah+BO8A+YG6G3xzgCPAA+AZ8Am7Lz2IWwhJgEGgk5BWwOeH3JMdvS5HKB+UwDPQA84FOYD/wWroJ4Cgww6v8qXTvgF3y6wD2Ai+l+w0c9/ym4LCX3JxDVIGzCmR2F4CZartLviDiN1uEJ2R3EZgVseO+DKzyLPTojs32MvBIZ6s8C9uAMdlejZH4IqW1Lw+bNKD+PRfx6wI+ex2chNEmAm31uuAk1v4QGz0C50LlXSl25ATZA/yQ7SXgoc67c/y2e6TNry00OCDli8QQdqhtruLzCnLQW7WFie3q84a3FkuOhuKxR2In0A4sUpIR6az6XiZPuevCG2AAeKYZsbn6IN0vbUwmOpU89aC8BdZG/BZ7Q5wSW8NjWt0oKkC/mGYFqalq3++K9ONq9zpgnqQbOAPUZXM9dgVtwLUmgtwUCUt+w3uIVmZ0d7V3jSdC5cl/CGKETnukQz/XtdC/ri4vdR9XqbWxICkSdfm459WIUIAAuuaGiv6LgYwgKbggTrqaINCt78/dh+GMICm4IE6qQdKUoJfWzt9dsPEgSBFUp0GgXecxSsCQgtnGFL2C9fo+VAaBmrcRRQk4n1NlEFihTahrO/IIrNFTbmu4nJLgNmIkQiJM/l629tCVhopexoY60a97rko2qO3uJ/xW6i8Z0yRhc+Aeppj8VOWlJ/exTElswt3PsZ1t4Kbc+R9iqg4lZ/8vuAAAAABJRU5ErkJggg==" />
                                        </div>
                                    </div>}
                            </div>
                            <div className='mt-8 max-h-[85px] overflow-y-auto'>
                                <div className='text-black text-xl font-semibold'>{d1.singleIdea.desc}</div>
                            </div>
                            <div className='flex mt-10 max-h-64 overflow-y-auto'>
                                {d1.singleIdea.photos.length ? d1?.singleIdea?.photos?.map((photo, index) => (
                                    <img key={index} className='h-60 m-4 ml-8 w-60 rounded-2xl mr-2' src={photo.link} alt="photo" />
                                )) : <div className='flex mr-10 bg-slate-700 rounded-3xl'>
                                    <div>
                                        <p className='text-3xl pl-5 pt-5 text-black'>You can add image to this Idea.</p>
                                    </div>
                                    <div className='mr-8 mt-5 mb-6'>
                                        <div>
                                            <textarea
                                                placeholder="Photo Link..."
                                                className="bg-slate-500 text-white px-4 py-3 rounded-md w-full h-12 resize-none"
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                            ></textarea>
                                            <a href='https://www.atatus.com/tools/image-to-url' target="_blank" className='text-sm font-light hover:text-red-500'>Photo to link</a>
                                            <p className='text-sm font-light'>We are working on this feature.</p>
                                        </div>
                                        <div className="flex justify-start mt-10">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                                                onClick={fun}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            {d1.singleIdea.photos.length ? <div className='mt-2'>
                                <div className='flex'>
                                    <textarea
                                        placeholder="Photo Link..."
                                        className="bg-slate-500 text-white px-4 py-3 rounded-md w-56 h-12 resize-none"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    ></textarea>
                                    <div className='pl-2'>
                                        <button onClick={fun} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <img className='h-7 w-9' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGN0lEQVR4nO2deYhXRRzAP6uta5rtph22FZ3Q9YelHdBFYVqrbkUn0Z0EXRLd0UURQYcZdlpUlHQQBR1ikgWVkRSV2V2W5ZodVqtUYpm5ExOzsMRvvu/9fr95b+a9Nx8YWHZh5jvzfW/ezPdaiEQikUgkEolEIpFIJCPagL2ATbMaoKgMBo4C5gBrge+AaY7HOAb4FVDA38CLwHFGKZVlE+AKs+CqRjvV0TidRrG1xvgZuA4YSYUYBlwN/GJZlP4239F4pySMo9sfwK1AOyXnBKAnxYIohwroSjmeMg/F+WZbLBXbAi/XsRDK4RbUCiyqc+y3gd0pCScBq+p8Cqc5lkHv8TPrlONP4BKghYKin7x765jwG8DJGZ9M2szpp5638VlgBAVjC+D1Ovb6gzzIuDfwNNCXQsZPgR0pCFsDn6SY1JfAJN/CAvsAC1LI+yMwhsDZBfg2YSL6InSN2aJCQe/z5wK/J8jeC+xLoGwHLE+YwBfAOMJlB2Bhwhz0jXpPAmOU2SclwecCHYTPEGBWwlxWGGUFgd5K3kwQ+DZgEMXi4oQP9IfAcAJgZsLi30JxOR1YL8ztqRAuWdLiX0XxOTPhTdCmC2/HzV5BsLspD5cK81wD7OxDqDmCUM8X+Qpv4RFhvgvy/sYdLwizpKRm3aHAu8K8z8hLEG1PWSpcssbmdFScYYxrq8zP+ndZs6vg3FmR16noMuEpuDEPAYA7a4ytf5fX8dQ2/+uzHnxjYKVl8M9yegqxfPz17/JA7/XvWdagN2vL6YWC9ieTH8rS8uJQQQb9hmSmedve/xr5ojwrAGNaqSVDT1YuzfHCxPXfqqaAgwU5JmYx4GzLYPpoRgUVgGA5fZIMQknWWAabSnUVcJZFjrWuj6RThIHaK6yA4YITR6+ZM+6xDKJ9qlRYAZjtppYs9+GQryyDaHNt1RVwmkUWvWbOYmpqmWM3AFvhBxWQAra0rE+fq5jTicLN1xcqIAVgIjxqyTPBRedXWjp/HH+owBTwhEUeHf3dNA9YOtdOCl+owBRgc9ho537T2ML4dNKDL1RgCjjWIs9LLjr/3NJ5Hnb/oihgrEUeHarTND9YOteZJ806U1QgrVmnTqel3+9xwG+WztsdOlNUIK1Rp06Hpb/VOMAWF9NobKcUSaE8t0adOq2Ci7Zp1lk6b/R1LaMCNrL0px/eprEtWKO3vDJuQSMs/WlDXdMss3S+fYP9Vekj/BMO+MjSuc4694WyNF+Ms8ij165p5ls618FZvlCBKaA7y1Rbmy9AZ7n4QgWmgMst8jyUZSiK9hH7QgWmgEeztJdNEGJAfaECU4DNXKOz9J2kH22wDKDzwqqugM0Fh4z+mxMW+44IDlgBZwsJic6YIWSRV10B87L0BSSFpfzlqdaOCkQBmwmmmvGukxNWWwbSCc5VVcBUixwrjX3IKQ9aBvvAQzqSCkABLSZVNfOYoH4OESY+qYIKOFqQ47CsNL7EMuBbVE8B7winn8wqbp0jTL5KCRpHCjLovOLMaBVqvi3LMXW/12OK0jAhVLMnjzStiwTt30T5k/TuEOZ/Xh4CDBWeAO0D3b/Eaar7Af8IT79em1ywxYsqUzNI24/KxkjhEOLjJPifGUIqVVC08jRJ375XhfnO9lULVIpw0I6csnB/QplNXaTQC5MTSrnousxF5wZhfspUA/aKdCoocsGmFmB6EebWaoquqoTtqEjfhMHAwwlzmhtSjekOwTDV314w5tvQGQ28kjCXRaHUi/t/cNI3CYLrI+qBhEuXUIykvy01B5BgC7cmKUFf1m42V/pQaDXfsqQyxh83EZafG50ptiNlFNVNGDyWQt6FRfpPGx0pPsxqwMSmeKwxN1qI+uhv80Lc89O81tNTVidXJvLiAg9mjN0Emdabu0wwp51G6B7wH4zStHXAc6YQRqMR2PUwyGJc1EXID6AkbAM8U4cS1ID2tclJvhY40STE7WT2Y1cW0DEDlNBnxitCneu6OUIwZasGmytztH4T9jDfhFLTZgJ+lztWRF4OmdIwxMTVSDb2elpeLsnS0WJux7OaTFuKCnC0PXUBtwPvpzifxy0oY0YBh5sS8XeZuhWLjT2m1xxZ8/QJRyKRSCQSiUQikQjN8i8k5kERwKSOkAAAAABJRU5ErkJggg==" />
                                        </button>
                                    </div>
                                </div>
                                <a href='https://www.atatus.com/tools/image-to-url' target="_blank" className='text-sm pt-4 font-light hover:text-red-500'>Photo to link</a>
                            </div> :
                                <div></div>}
                            <div className=' absolute bottom-0'>
                                <div className='text-black flex'>
                                    <p className='text-xl'>{`Funding -${d1?.singleIdea?.fund}`}</p>
                                    <img className='h-6 w-6 ml-1 mt-1' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAMtklEQVR4nO1dC7BWVRX+Lje4EXCJh4YQSiY+iIdcFQHJFAghLSUjA8MwoXgUWTQ21VSE00iaOWWTolJjRRqa5oA1PTRIEVEUiuTySHwUXahATEHhPv5mNeuf2bPu2ufsc87e5z/38c2cmXvPv89+n73X+tba6wCd6EQn2jZqAZwN4EoA1wP4BYAnAPwFwPMADgI4ytdBvvdnTkNplwGYxXlQXp1IiB4AJgNYDmAzgGYAJY8XDdgKADMA9OkcHR29AcwFsB5Ak+cBiLoaAawDcA3XoUOjCsA0APcCeCPHQShZriMA7gEwlevWYVANYCbvAa6d9Tfl3jAAQ3jZ6cpXH743zDEP20V1+xjXtd3iLQA+CWC3Q4fsAPAdANMBDODnZZo4aOkHcJ43A9jpUI9dAK5ujwMzDsCWmMY/B+DrAN5jycPHgEgMB/ANANtj6vYsgLFoB6Al5HsRkhLdX8NSVVVMXiEGxMQEAKt5o9fq2gLgJwCOQxvFhwD829K4YwBuAzA4QX6lwANSxokAbuc6anWnNl2CNrZXLLW8FS08C4emyLeU04CUcRLrK02WdtCb3w0FBzXiyYg9YnyGvEs5D0gZ53HdtTY9wW9UIXEWgP2W5Ym07pqM+ZcqNCBgkfpLAN5U8t0HoA4Fw4UAXlUq+xKAcz2VUarggJRRx9SLzPs1AFNQEEy3aNprAfT1WE6pAAMCplh+qeRP5OYVqDA+atm8vxWAfigVZEDAbbtBKaOZScuKLVNvKtLHkkDllQo0IGV8RpmQRyuxfNEG/l9RkUbmf9CBBgRsp5HKJO2no5GjaLtfeTNmBy63VNABIXyC+0BKX8FF4q4WPWNx6ILRusyNAOoBNLBQ8Qb/Xc+/5TkghM8pZW7gPguGm5VC6wPyOz15SVijlJv0WsN5UZ4hcBz3hSz3xkDl4YPKa1m+XgHweY+zYTQbi454GAibIepMT3Xtym1/xVIe9dnF8Iz+AP7j0Nh6tgJmUbx+FTHwPq8WLiuLlj3N8lbI61+edTLcpYh2UYamhwGcllDZWukwENuZJZ4PYCKAkxWL4bv5t/mcNq7DWrh9SWzqp3EbbXnu5j4y7xGD7M24JGXtpcx0fhHAIUuljvGe09thlv09onHP8IY5MEMbBgG4lg1NtnJeZnt6FHpzm2zU/CHuk27cR+Zv1Idj4IFK36LMUpMoPB7AnRFGKBKR5wHoIvKm/2+KWU7GwD+IW3vI8ja28Cas1XWehTwtd/ad3Bdl1CiWyM1ZzcHXKAUTHW3biNdHzECanedz2u4A7rOk25gTe0qOc5ssdbiP6wiuc9SbtT5CCTxPmaiks6RCNRv5zcxWOfJbL0Y0oOx5qEk/C5TZGRJU1iKLNFf2fLS140VuaxxWKQ4cqdo4U2TUmMDSR7PrawBej9lQzWVwOCqHkdxRLnV9ndtWfoPiMFShVlwGshWbKf2mSBJJioFsBm2OeeWL4DX4dgB/iqhn2fxM1FFSrBR5bU3Khk9TKnQpsklqDRbt+a0oDrqzHUfWs4HbkBaXKnlelCSDeyPcYMqOa0nwXuUtWVewwTAHRb4pzWxuSIp+7AyhOUq47Mf/R+8YyoKo5esS2MhrlU1+e0GWqajlS+4pLyQ4zlDDfaSZtcvXYdf85jlubmQvv8ohvx+J54iVHYXiY7gyMWkvcOH8XP2IyU01FlKXeCDCDYauRwCMiPAGlOlJtG0rWKTU36aHjeC+sPXTc9yX5r1H4yrQWxHR6pgnWswnlLTCmpg3IhLSxJOK0hdaz6hmMXYqTwhZpySguj6l6Ccm+nPbbedaDnLfdeW+NH8jCqZX3Osml6UqUfgPIwo3afjJilAQUgM/HsAtivtqM0+EGSkdL85RaJZJDrR7E/eVOSGquE/NdB+IKvy7IvGtlnQjY17PHUwKmveImwrpinTIYc3+LUs+JlfnAmkgeyZGkXyE+0jDrSItHbuwYqtIfHlMRT8MYI/jBhaCKCTMiaDtNU/DbSxFXcGz9QzEY6xjG/dwn0ThcmVwVdQquoIL5U26xFfYe89WUWuhGTFUsTsQw/ARXpu78PLyR5HGXNbIeuiCqPMtr3EfuOhVA5UltadtrZT7RxJQQXdbZivZM0LgB6KcNRb9qAtvvHJPuy1uUzXwBaVdLdzmpLYauY+QW1UrXKlQ0EiplcuKZzEuRcHcp45EOFuQO86vRZ12JtzkByvtoramgTQ9EJHbCstEInKVTIOzRD5kQk2LmphOM80DJGJL0LMLDae+JvEG23QKG3a6zGwHSDdUsi62guT+SWNPg0+JfGhZSIN+7NcUpc2aeg4Zm0ycKjipbSxY/NW4R2cak2CFpz6SbIi6j20QiWgzTANZaXI2SIqeHB6Dnj8QQWjebZSz1xBlrzNoj6OGD4CsHz2fBAs9OS5MEvk8riWS9o/TUxYmqZcLPayx37aku1qku4zt1uX/n1JonTuM33+asSOJsU6D00U+NPla4QWRKMmBTBPbRD50kD8JpojnH4oQJwdYWIMj7P1RHSMIqGt3BE4W5dAkToPBiv7SCtIRLm1gln+IfEzN2AW/MZ7d5WAqfUyZtTZT8/kibdKz5/3F89TWNOij6EWtIBWstCdMj2TIp4eoR5SHxtvYR6pJKFk20fcdwv9rcwpuq0Z5E9Ogm8IoFHJAhjvqL++L8Jyk8B0a3mkYjFpS7m25DkgRlqzx4llJ/vViBrXFkMCuEhwc7Tk2LOA09GalQa5LVqhN/V0Jnj1VPGuKu1MF5fCA8fv3jfsHIpYiolC+msF7MNdNXYq9LiyohnUiH3J8dkW1oNGn82z6sXFvv+LXNCfDJEgCaeMh0jINznARe0Mphgsy6CCbAfzT+P/nFgugdLMZnZNJ15diSJJiYamTScpGvZeD2bgysacgDHKlTopALlaxlGQSgI0xZ01qBD/1asCAY7vyJBcl/X6/R/qdzmfEYQiA3ynPlikQTVojqetBkZac+ULgRI/0+/0u9PvZAQ1UdFgmDpdw2iYWS+eKvOiY8ZeZMp/ADs/7FL2A4i2GwJKABirV+aOXYsId5MmES+crXLBM2N7nR0R4KykuNRQwORSkv0FaE+4gVxOuZjf26eSQNirQREsEHvPaYxwGCoFxlXBy0M6hk83alxtQlAYdhxqWTP7Ail95VtL/n84hsttaj25A0g+AjvXFruM+HOUmKest7VM+UIX8cK6yL0706CgXeYy81rMrqQxxsSnnI2tZUS0MXiVWoH26kvZMSn34drYmbbet4LPKWz7eo7M1pY/FXM/HEVYqxxFyC12UASMUUwIdffZ5HIE4uIoc2JFM8g525ywq+ipaeYgDO72yHGlrznCkbYKi42xkC2HR0F0xC1PdL/B8pO1nSTKamtOhz7UJjhfnge6WGCYhDn1OKeqx6I0pHCFCoE+Rj0WD4yfmFThgR4QilQfOVPaMkIEDZqSVwXfmHFpjUc56SjXrCFrc4Q2BQmvUZ2mj9Axs5g3aR/CZ1RFU+znIRwOXSl/5Wm0QhVmCz2jCzOysM+jZgOGZbowIk7Qm0EdUxrEwYSt3ubK++wrP9LSPFWBs4ABmF3HwsJLl2sIm2rReMOBnl8RQ6C85SD5ZA5h5e/NNB+VQIf7ucgjxt5OltoVMXp7CSlw3vvryJjqZ09zhsFm38OyuDRziL+2xDBX9Ir6W4zMI5mg2yeYVBPPBjNFJXYNg7vcdBLNMzecVJnYUSyeHAwzEYc57VI5hYiPPomfBTRUIpDzLYyDlWRUIpExCQjB0tegQoU7Zmih6qPFrlTIfTxCcIJM7zD7ltXSh4rOglLCD8xwQLXhBQ0bJMBHqFGq5MbDXR6mgA/JxhRo55DGUuTMuUCiHFpbDO8qALLZ80OX9qBBmWDT0G9r5J4+68EFUWUYTh/WoKC6zkHMPt9OPgvVTokIU5qNg5vKlUSgve+SjSgUYkDqLY2ChPptnOgXs7YAflmwostPGYJa9S8q1K+VBy0oPyPgIN6hNAU9reUN7+TjxEIePEwf9vpRvXMxflilZlrHbE37FrJTTgJzELHFjBFEYjJvK6wP3NjdLeot+z85lVW3kA/dZopwWBmMizKXlq56XupE5Dggxvt90+DLC0zmZlXNFNYfKcPksxG4O+UpnKU7wOCAncJ63xBjYzEkyu405iCdGF/bWiDKnlsSl+coO441XfhRsCP8m08cd+jGvrcxCtOuBkKhie/qqQN8rLKU0XE3J+fxJIVHLLkePJjhT6OM6xkcC5iRxfO5o6MFOCstZEIhyQ016NbOSt4KXpCJ/MqOw6MkH9GeyFHYPswFbeV84wMTeUf77ef7tMU67lN1i6wKabzvRiU4gD/wPNYPwz15bFssAAAAASUVORK5CYII=" />
                                    {flag == 0 ? <div className='mt-1 ml-10'>
                                        <input onChange={(e) => {
                                            setToken(e.target.value)
                                        }} type="Number" placeholder='fund' className=' bg-slate-800 pl-1 text-white rounded-lg' />

                                        <button onClick={givtok} className=' ml-2 bg-blue-600 rounded-lg  px-1'>send</button>
                                    </div> : <></>}
                                </div>
                                <div className='flex'>
                                    <img className="h-7 w-8  mt-3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPklEQVR4nO2ZV2hUQRSGP2MNIjZEJCpYsYXYwGAHUUR9saCgKCi+iBoloOKjBBQRxbxYsOCzNYJgB9FgeQjYxd6NiEYjSuwrR/6FQTbZu9nNzgTywTzcmTnn/ufuTjsDDcdw4A4QU7kNDKMRcsUJIl4u00joCWwBKoA/Et9CJaY6a9sMdCdQioHvCX6FOP/XfwNWExgbnS9eBsyuI5AFwGnnuYRAmKYAfgBznPraAokzH/gp26l4Jge4J4Fr/mtLFoix1pnRmuGRSRLyFGhVj0DM5pnqJ+CRUonYkKAtSiDI1uq3EcBaMTZB2yXgYh3PccbJh7V745VEdEzDR2f5eIEHOgBnJKBGg76+5GhNMV82LbfHw9j4CKzMgD/z8UE+t5NFnuilEzPoc7x8PiaL1Oil5cA+YJVW89FAb6CXxo07duLPvVUKgZlAkX4F8xX/q2aNygR7p0yVSrKM7V736uU3gWP6qveB10AVUO0IrFbdG/Up176sQu0ngDw8MUMiTqbh46h8LMYjUyTis84cqWJblE/yMR2PnJOIdfXc9JnNevkwX964KxEFafgokA8733vjkEQsScPHUvk4iEcWScRzHXVTpVi25mMhHmkOHNYprzrFPVeOMz0fkS/vXJegwSnY5MvGTpjBUCpRloSIyibZ7CIgRkiUrdxdIvTv5Ox2xxAYZRJ2QYel2mjnpIPOEiB5wFsJtJ1tbQxQH1vR+xAoFRECGaQ+jwiYWxECGag+LwmYhxI5JEmi2/q8I1C6Al8kskcd/dprAf2uoIIiH7ihIE5F6H/QWQxHEgCDgZ1KYJuwB0C3CHadle81m1/AfmAoWcYOULOA885lzm/ggPJdUbH1ZI9sY062cS7QsgH10wZY4exWrXwFdicZ3MmwWWyHM75iymBaZiY3g/r/neKWKKHgXmwWpZkqTTQJLHfGWkyJiqWZuHJoCxx3HF/N0qXMZF2cxt9bJi31orWy5+boPTCP7LPQ+ctdTHAHE4ntzgrcH79T+0tp2ZqqcT/d79mMMgr/FEqLTfN9UzEs0Rewq4NQOFvH7VitXJPRMsJhmTPhROZjAyap0y1VUYPIDUBsLEmxxbmJJpogOn8BqLl1Pd/gsuQAAAAASUVORK5CYII=" alt="worker" />
                                    <p className='ml-1 mt-5 text-black'>(worker)</p>
                                    <p className='ml-1 mt-4 text-xl text-black'>- {d1.singleIdea.worker}</p>
                                </div>
                                <div className='flex'>
                                    <img className="h-7 w-7 mt-3 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFLUlEQVR4nO2dWYgcRRjHf2a97xiD2RjFEASVBDSSoIJ4ICtBFMxLFE8QYiKIYBQ8EXwJaDzABzWaoBIQZQVFUVGiiMEX8+CZqPEgaLyPjVnNrhpHiq3FyaS/6pqZqq7pqe8H9TJM93z1/3dXV1V/VQOKoiiKUj9OBd4BxoBPgXXAUmBa6sBy4EjgV6BRUP4CXgTOSB1kP3OLIH5reRWYnzrYfuQTTwNM+Ru4C5iSOuh+4fQ2xG8uw8D+qYPvB1Z3aEDDPhv2Tl2BOnMAMCKI+zXwj4cJD6auRJ25TBB1HJhuu6B3OnpIpvwLLEpdkbryuiDqcy3fmwW85TDhK2DfRHWoLccCuwRBLyz4/gDwpMOE5QnqUGvuEIT83vFgNZ9vEI77oOL4a81ewBZByFUlx85z3DknVxR/7TnT0ZTM9Tj+FeHYmyuIvS9YIwj4rufxSx2DM6WEg4DfBQGvw4/5wvGbPI/PmqscfX/fqedpjge4UsKbgnjP4M8+DhMVBwvsyLVIvEVtNmNF5xht4xzZcSXwhyDcN3ag5css4TzbIsZfWw62rxcbjrKyg9eX+hD2YB6wuUR8M+N5fKBJvNfaPE9fcw3wZ4n4DTvb2S4rhXPp1DQTD8inPITfYa/kTnhbOOe1ZM5cOxgqE99MnJ3QhcHjwnlPIfNezqiH+ObuOLCL31ksnPeXXF/UmyvyCc8m5/IAv7fO8yVOFphm5GMP8T/soslpZqrjwX4FmWHE+NZD/DVdNjnN3CD8hklnPIwac45ND9kstOO/2TdRy5reva4oEX7UPhdCMcVjTNFJGbXnfdnOxh5NhcwB1rcZ8OfA2bZZkb7zEXBi4FgvjiC+lHn3MDCDyJhk1587DFKaUGsAawM2Oc08XZEBk2UkZrrLnC7El8o4cHWsgBMYMDlNYprd4LTb7PiU64nL+SV3XkwTgt4J50YKdCrVvE3bksCIkZDPhNWOrtyNwGDBMYO21zPmCLLOA8mFwP3ATkf9zIM5ai6+EbiMm/rQgNa5rK2O3tFMAiBlJBRd+a0M9rkBkybsjJn+2K2A/W6A4QGhji8RADWgnIWCTmbE3DVqgN977CKdTPPdNWpA4qZWDfBDDUiMGpAYNSAxakDiFTxqQEKmx0z+1V5QOWcJOn1BANSAch4SdHqBAKgBbg4Htgs6mayMrlED3NzmmI4OkjGhBsiY7W++i515pwbILHfocxqBUAOKGXCs3jdJDMFQA4pZ4tBmiICoAcVsFLR5z46Mg6EG7MmQQ5dLCIwa4J+o9mWMPenUgD0Xj1e6CZQasDvDgiY/2E0Fg6MG7J6kLO3MaEbEUVAD/ucxR/ZDtFxXNWCCGY4MuHuJiBowwT2O3dqPISJqABzq2LH38ZjiqwET3CqIb9YdnERkcr8D9nMsr61ksXfuBixz1MFspR+dnA0YAD4T4n+jqiByNmCJI36zCLAScjZgoxD7+6GnnF3kasCQI/ZLqwwkVwPWVznl7CJHAxY44vbdLjkYORrwvGPKOca+FtGWqc50GDBIb3KRI+bbUwQUa6H2CnqPC+xWaUXxmgvxiBRBPSoENGZF7HSrgjHH8VVyFHAe8GzJ32DdnXJ3rEbmZatditpzfx+VQxkPmWbYKccBP2Yq/mJ6BDPz91MXldkUaRO9RqSyza586Slm2x3H26nILrsV5SG2rHX8rVSjB8qY3Xyjp/+Z21wZj9iruqjbtt3u97zKbknfivnsPvsdaZxRVdlhd3YctolVSbqaiqIoiqIoiqKQDf8BZS818Cu6IisAAAAASUVORK5CYII=" alt="like" />
                                    <p className='ml-1 mt-[15px] text-xl text-black'>- {d1.singleIdea.like}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
