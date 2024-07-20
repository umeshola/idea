import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import ss from '../assets/ss.png'
import { ALL_friend, CHECK_FOR_MSG, GET_MSG_ALL, GetYourIdea_withPhtot, Like_Idea, SEEN, Send_msg } from '../connection/query'
export default function YourIdea() {
    const [id, setID] = useState(0)
    const [msg, setMsg] = useState('')
    const [name, setName] = useState('')
    const { data: d1, refetch: r1 } = useQuery(GetYourIdea_withPhtot);
    const { data: d2, refetch: r2 } = useQuery(ALL_friend);
    const { data: d3, refetch: r3 } = useQuery(GET_MSG_ALL, {
        variables: {
            data: id
        }
    });

    const [send] = useMutation(Send_msg);
    const [like] = useMutation(Like_Idea);
    const [seen] = useMutation(SEEN);
    const handleLike = async (IdeaID) => {
        try {
            await like({
                variables: {
                    data: {
                        on: IdeaID
                    }
                }
            });
            r1();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlesend = async () => {
        try {
            await send({
                variables: {
                    data: {
                        to: id,
                        msg: msg
                    }
                }
            });
            r3();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlechangestate = async (idd, userName) => {
        setID(idd)
        setName(userName)
    }
    const handlechangestatetozero = () => {
        setID(0)
        setName('')
    }
    const truncateString = (str, num) => {
        return str.length > num ? str.slice(0, num) + " . . ." : str
    };


    return (
        <div className='mt-10 mx-32'>
            <div className='flex'>
                <div className='flex-1'>
                    <div className='m-10 bg-slate-400 text-black opacity-90 h-96 min-w-96 max-w-96 rounded-3xl'>
                        <div className='text-center bg-slate-300 rounded-t-3xl'>
                            <div className='flex'>
                                {id == 0 ? <div className='ml-9'></div> : <div className='ml-2 mt-1 -mb-1'>
                                    <button onClick={handlechangestatetozero} className='hover:bg-blue-300 rounded-full'>
                                        <img className='h-7 w-7' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVR4nO3cIQ7CUBAE0NUTbsWRsWC4E7qYosE00/DfS9Y3M2sq/s4AAAAAAAAAAABfZB8KMjP3mXnOzEUDnfC3fZRQDH9TQj/8TQn98DclHBv+44fwP3M78FuWkx83/zOvmbm2P/pfRPjCX1JsvvCXFJsv/CXF5gt/SbH5wl9SbL7wlxSbL/wl2fwi4RcJv0wBJ6CEE1DCCcQ/QF+U0Bcl9EUJfVFCX5TQFyX0RQl9UUJflNAXJfRFCX1RQl+U0Bcl9MUjvb54ptoXD7X74lRBXxzr6ItzNX1xsAkAAAAAAAAAgOENvkP9CLDAAXMAAAAASUVORK5CYII=" />
                                    </button>
                                </div>}
                                <p className='text-2xl ml-[105px]'>Messages</p>
                            </div>
                            <div className='h-[2px] bg-black min-w-96'></div>
                        </div>
                        {id == 0 ? <div className='max-h-64 mt-2 overflow-y-auto'>
                            {d2?.allFriends?.map((friend, index) => (
                                <div onClick={() => handlechangestate(friend.p2.id, friend.p2.userName)} key={index} className='flex hover:bg-green-50 min-h-4 hover:cursor-pointer max-h-10 m-1 bg-gray-300 rounded-2xl'>
                                    <div className='flex pb-1'>
                                        <div className='border-2 bg-slate-500 ml-1 mt-1 border-solid h-9 w-9 border-black rounded-full'>
                                            <p className='h-8 pl-[8px] pt-[1px] text-[20px] text-black w-11 rounded-full'>{friend.p2.userName.charAt(0).toUpperCase()}</p>
                                        </div>
                                        <div className='h-auto ml-3 w-[1px] bg-black'></div>
                                    </div>
                                    <div className='ml-3 mt-1'>
                                        <p className='text-lg font-bold '>{friend.p2.userName}</p>
                                    </div>
                                </div>))}
                        </div> :
                            <div className='m-1 min-h-[340px] rounded-3xl relative  bg-slate-600'>
                                <div className='flex bg-slate-500 rounded-t-3xl relative'>
                                    <p className='text-2xl font-semibold ml-3 mt-1'>{name}</p>
                                </div>
                                <div className='h-[2px] w-auto bg-black'></div>
                                <div className='relative mt-1 min-h-[240px] max-h-[240px] overflow-y-auto '>
                                    {d3?.get_msg?.messages?.map((Msg, index) => (
                                        <div key={index} className={`flex ${Msg.side ? 'justify-end' : 'justify-start'} mb-1 mx-1`}>
                                            <div className={`h-auto w-fit ${Msg.side ? 'bg-green-200 rounded-l-2xl' : 'bg-slate-400 rounded-r-2xl'} rounded-b-xl p-[4px]`}>
                                                <p className='max-w-72 text-lg font-medium'>{Msg.msg}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex absolute bottom-0 ml-1'>
                                    <input onChange={(e) => {
                                        setMsg(e.target.value)
                                    }} type="text" className=' rounded-3xl h-10 max-w-80 min-w-80 pl-2 text-xl' placeholder='Message...' />
                                    <div className='ml-1'>
                                        <button onClick={handlesend} className='bg-blue-700  rounded-full h-10 w-10'>
                                            <img className='h-7 w-8 ml-[6px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACYUlEQVR4nO2ZIYwTURRFDwFBg0BgURgwSBTItSiCRWJXYpFYJBaJRWIbVE3FiprqKpJJmjQVzSMkM6GG7AK/ff+9d09y/Z97k07PfBBCCCGEEEIIIYQQ4jcL4A1wR6X4YGPWwDvgvtM5qD7AlAH4CDz0PljVAabsgS/AM+8DVh3gOHPgJXDL+7BVB5iyAi6Bu96HrjrAlA3wHnjgffiqA0zZAZ+BJ94PUXWAKQfgK3Dh/TBVBziOxM55AIldJwPYGImd8wA2RmLnPIAdRWLnPICNkdg5D2BjSouddZRdRbGzDnOoJHbWeRbZb+wsSNZZb+wsWIZsN3YWNPssN3aWIPPIN3aWKKuIN3aWMJtIYmeJs4sgdlYgh57Fzopl0ZvYWdGsexE7K57BW+xmwCPgBfB6/Bv3YXx5fQOugB8dFGXVxa7SUPPIYpdpqFVEscs41CaS2GUeahdB7CoMdehZ7CoN8JwCzDr6CdoCn4DHJGDWUbGpXsKRirVrsgTe9vI3NFOx1pOIVSrWrvkU8euZn3JmrHgG749xVvhz9CVwz6v4qgMsdCHD2UvvWpwscbYRxMkSZhNJnCxRlj2J002xBJlHvsGyoNl7iVNrLFgGb3FqjQXJuhdxao11nkVv4tQa6zCHnsWpNdZRthHEqTXWQTaRxKk1nsUvI4pTazyKn0cWp9acq/R9FnFqzamLH7KJU2tOVfw6qzi1pnXx6cWpNS1KLyVOrfmf4kuKU2v+pfjS4tSavyle4nQCblK8xOmE/Kl0idOZkDg5I3Fy5jvwCrjtfRAhhBBCCCGEEEIIIQjMT3Qa0OoZjujYAAAAAElFTkSuQmCC" />
                                        </button>
                                    </div>
                                </div>
                            </div>}

                    </div>
                </div>
                <div className='flex-[2] max-h-[740px] overflow-y-auto'>
                    {d1?.yourIdea?.map((idea, index) => (
                        <div key={index} className='bg-slate-600 relative mt-10 flex min-h-60 min-w-[800px] rounded-3xl'>
                            <div className='border-2 bg-slate-700 ml-1 mt-1 border-solid h-12 border-black rounded-full'>
                                <p className='h-13 pl-[13px] pt-[1px] text-[28px] text-black w-11 rounded-full'>{idea.by.userName.charAt(0).toUpperCase()}</p>
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
                                            <img className='h-32 absolute z-32 w-32 rounded-2xl' src={idea.photos[0].link} alt="photo" />
                                        )}
                                        {idea.photos.length > 1 && (
                                            <img className='h-32 w-32 mt-2 ml-6 rounded-2xl' src={idea.photos[1].link} alt="photo" />
                                        )}
                                    </div>
                                    {idea.photos.length == 0 && (<div className='text-black text-lg font-semibold'>{truncateString(idea.desc, 4000)}</div>)}
                                    {idea.photos.length == 1 && (<div className='ml-[150px] text-black text-lg font-semibold'>{truncateString(idea.desc, 1000)}</div>)}
                                    {idea.photos.length > 1 && (<div className='ml-8 text-black text-lg font-semibold'>{truncateString(idea.desc, 85)}</div>)}
                                </div>
                                <div className='flex absolute bottom-0'>
                                    <div className='flex'>
                                        <div onClick={() => handleLike(idea.id)}>
                                            <img className="h-5 w-5 hover:cursor-pointer hover:filter hover:invert hover:sepia hover:saturate-100 hover:hue-rotate-180 hover:brightness-200" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFLUlEQVR4nO2dWYgcRRjHf2a97xiD2RjFEASVBDSSoIJ4ICtBFMxLFE8QYiKIYBQ8EXwJaDzABzWaoBIQZQVFUVGiiMEX8+CZqPEgaLyPjVnNrhpHiq3FyaS/6pqZqq7pqe8H9TJM93z1/3dXV1V/VQOKoiiKUj9OBd4BxoBPgXXAUmBa6sBy4EjgV6BRUP4CXgTOSB1kP3OLIH5reRWYnzrYfuQTTwNM+Ru4C5iSOuh+4fQ2xG8uw8D+qYPvB1Z3aEDDPhv2Tl2BOnMAMCKI+zXwj4cJD6auRJ25TBB1HJhuu6B3OnpIpvwLLEpdkbryuiDqcy3fmwW85TDhK2DfRHWoLccCuwRBLyz4/gDwpMOE5QnqUGvuEIT83vFgNZ9vEI77oOL4a81ewBZByFUlx85z3DknVxR/7TnT0ZTM9Tj+FeHYmyuIvS9YIwj4rufxSx2DM6WEg4DfBQGvw4/5wvGbPI/PmqscfX/fqedpjge4UsKbgnjP4M8+DhMVBwvsyLVIvEVtNmNF5xht4xzZcSXwhyDcN3ag5css4TzbIsZfWw62rxcbjrKyg9eX+hD2YB6wuUR8M+N5fKBJvNfaPE9fcw3wZ4n4DTvb2S4rhXPp1DQTD8inPITfYa/kTnhbOOe1ZM5cOxgqE99MnJ3QhcHjwnlPIfNezqiH+ObuOLCL31ksnPeXXF/UmyvyCc8m5/IAv7fO8yVOFphm5GMP8T/soslpZqrjwX4FmWHE+NZD/DVdNjnN3CD8hklnPIwac45ND9kstOO/2TdRy5reva4oEX7UPhdCMcVjTNFJGbXnfdnOxh5NhcwB1rcZ8OfA2bZZkb7zEXBi4FgvjiC+lHn3MDCDyJhk1587DFKaUGsAawM2Oc08XZEBk2UkZrrLnC7El8o4cHWsgBMYMDlNYprd4LTb7PiU64nL+SV3XkwTgt4J50YKdCrVvE3bksCIkZDPhNWOrtyNwGDBMYO21zPmCLLOA8mFwP3ATkf9zIM5ai6+EbiMm/rQgNa5rK2O3tFMAiBlJBRd+a0M9rkBkybsjJn+2K2A/W6A4QGhji8RADWgnIWCTmbE3DVqgN977CKdTPPdNWpA4qZWDfBDDUiMGpAYNSAxakDiFTxqQEKmx0z+1V5QOWcJOn1BANSAch4SdHqBAKgBbg4Htgs6mayMrlED3NzmmI4OkjGhBsiY7W++i515pwbILHfocxqBUAOKGXCs3jdJDMFQA4pZ4tBmiICoAcVsFLR5z46Mg6EG7MmQQ5dLCIwa4J+o9mWMPenUgD0Xj1e6CZQasDvDgiY/2E0Fg6MG7J6kLO3MaEbEUVAD/ucxR/ZDtFxXNWCCGY4MuHuJiBowwT2O3dqPISJqABzq2LH38ZjiqwET3CqIb9YdnERkcr8D9nMsr61ksXfuBixz1MFspR+dnA0YAD4T4n+jqiByNmCJI36zCLAScjZgoxD7+6GnnF3kasCQI/ZLqwwkVwPWVznl7CJHAxY44vbdLjkYORrwvGPKOca+FtGWqc50GDBIb3KRI+bbUwQUa6H2CnqPC+xWaUXxmgvxiBRBPSoENGZF7HSrgjHH8VVyFHAe8GzJ32DdnXJ3rEbmZatditpzfx+VQxkPmWbYKccBP2Yq/mJ6BDPz91MXldkUaRO9RqSyza586Slm2x3H26nILrsV5SG2rHX8rVSjB8qY3Xyjp/+Z21wZj9iruqjbtt3u97zKbknfivnsPvsdaZxRVdlhd3YctolVSbqaiqIoiqIoiqKQDf8BZS818Cu6IisAAAAASUVORK5CYII=" alt="like" />
                                        </div>
                                        <p className='ml-1 text-black'>{idea.like}</p>
                                    </div>
                                    <div className='flex'>
                                        <img className="h-5 ml-5 w-5 hover:cursor-pointer hover:filter hover:invert hover:sepia hover:saturate-100 hover:hue-rotate-180 hover:brightness-200" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPklEQVR4nO2ZV2hUQRSGP2MNIjZEJCpYsYXYwGAHUUR9saCgKCi+iBoloOKjBBQRxbxYsOCzNYJgB9FgeQjYxd6NiEYjSuwrR/6FQTbZu9nNzgTywTzcmTnn/ufuTjsDDcdw4A4QU7kNDKMRcsUJIl4u00joCWwBKoA/Et9CJaY6a9sMdCdQioHvCX6FOP/XfwNWExgbnS9eBsyuI5AFwGnnuYRAmKYAfgBznPraAokzH/gp26l4Jge4J4Fr/mtLFoix1pnRmuGRSRLyFGhVj0DM5pnqJ+CRUonYkKAtSiDI1uq3EcBaMTZB2yXgYh3PccbJh7V745VEdEzDR2f5eIEHOgBnJKBGg76+5GhNMV82LbfHw9j4CKzMgD/z8UE+t5NFnuilEzPoc7x8PiaL1Oil5cA+YJVW89FAb6CXxo07duLPvVUKgZlAkX4F8xX/q2aNygR7p0yVSrKM7V736uU3gWP6qveB10AVUO0IrFbdG/Up176sQu0ngDw8MUMiTqbh46h8LMYjUyTis84cqWJblE/yMR2PnJOIdfXc9JnNevkwX964KxEFafgokA8733vjkEQsScPHUvk4iEcWScRzHXVTpVi25mMhHmkOHNYprzrFPVeOMz0fkS/vXJegwSnY5MvGTpjBUCpRloSIyibZ7CIgRkiUrdxdIvTv5Ox2xxAYZRJ2QYel2mjnpIPOEiB5wFsJtJ1tbQxQH1vR+xAoFRECGaQ+jwiYWxECGag+LwmYhxI5JEmi2/q8I1C6Al8kskcd/dprAf2uoIIiH7ihIE5F6H/QWQxHEgCDgZ1KYJuwB0C3CHadle81m1/AfmAoWcYOULOA885lzm/ggPJdUbH1ZI9sY062cS7QsgH10wZY4exWrXwFdicZ3MmwWWyHM75iymBaZiY3g/r/neKWKKHgXmwWpZkqTTQJLHfGWkyJiqWZuHJoCxx3HF/N0qXMZF2cxt9bJi31orWy5+boPTCP7LPQ+ctdTHAHE4ntzgrcH79T+0tp2ZqqcT/d79mMMgr/FEqLTfN9UzEs0Rewq4NQOFvH7VitXJPRMsJhmTPhROZjAyap0y1VUYPIDUBsLEmxxbmJJpogOn8BqLl1Pd/gsuQAAAAASUVORK5CYII=" alt="worker" />
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
