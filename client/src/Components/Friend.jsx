import React from 'react'
import { Accept_friend, ALL_friend, ALL_Request, ME } from '../connection/query';
import { useMutation, useQuery } from '@apollo/client';

export default function Friend() {
    const { data: d1 } = useQuery(ME);
    const { data: d2, refetch: r1 } = useQuery(ALL_Request, {
        variables: {
            data: d1?.me?.id
        }
    });

    const [askwork] = useMutation(Accept_friend);
    const { data: d3, refetch: r2 } = useQuery(ALL_friend);
    const add = async (id) => {
        try {
            await askwork({
                variables: {
                    data: id
                }
            });
            r1();
            r2();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='flex justify-center mt-20'>
            <div className='m-10 bg-slate-400 text-black opacity-95 h-96 overflow-y-auto min-w-96 max-w-96 rounded-3xl'>
                <div className='text-center bg-slate-300 rounded-3xl'>
                    <p className='text-2xl'>Friend Request</p>
                    <div className='h-[2px] bg-black min-w-96'></div>
                </div>
                {d2?.allRequest_singleUser?.map((idea, index) => (
                    <div key={index} className='flex min-h-5 m-1 bg-gray-300 hover:bg-slate-500 rounded-2xl'>
                        <div className='flex m-1'>
                            <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-11 w-11 border-black rounded-full'>
                                <p className=' pl-[8px] text-[24px] text-black w-11 rounded-full'>{idea.from.userName.charAt(0).toUpperCase()}</p>
                            </div>
                            <div className='h-10 ml-3 w-[1px] bg-black'></div>
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{idea.from.userName}</p>
                            <div className='flex'>
                                <svg onClick={() => add(idea.from.id)} className='h-5 w-5 hover:cursor-pointer hover:filter hover:invert hover:sepia hover:saturate-100 hover:hue-rotate-180 hover:brightness-200' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.5 22 22 17.5 22 12 C 22 10.9 21.8 9.8007812 21.5 8.8007812 L 19.800781 10.400391 C 19.900781 10.900391 20 11.4 20 12 C 20 16.4 16.4 20 12 20 C 7.6 20 4 16.4 4 12 C 4 7.6 7.6 4 12 4 C 13.6 4 15.100391 4.5007812 16.400391 5.3007812 L 17.800781 3.9003906 C 16.200781 2.7003906 14.2 2 12 2 z M 21.300781 3.3007812 L 11 13.599609 L 7.6992188 10.300781 L 6.3007812 11.699219 L 11 16.400391 L 22.699219 4.6992188 L 21.300781 3.3007812 z"></path>
                                </svg>
                                <p className=' text-xs mt-1'>(add friend)</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='m-10 bg-slate-400 text-black opacity-95 overflow-y-auto h-96 min-w-96 max-w-96 rounded-3xl'>
                <div className='text-center bg-slate-300 rounded-3xl'>
                    <p className='text-2xl'>Friends</p>
                    <div className='h-[2px] bg-black min-w-96'></div>
                </div>
                {d3?.allFriends?.map((idea, index) => (
                    <div key={index} className='flex min-h-5 m-1 bg-gray-300 hover:bg-slate-500 rounded-2xl'>
                        <div className='flex m-1'>
                            <div className='border-2 bg-slate-400 ml-1 mt-1 border-solid h-11 w-11 border-black rounded-full'>
                                <p className=' pl-[10px] text-[24px] text-black w-11 rounded-full'>{idea.p2.userName.charAt(0).toUpperCase()}</p>
                            </div>
                            <div className='h-10 ml-3 w-[1px] bg-black'></div>
                        </div>
                        <div>
                            <p className='text-xl mt-2 font-semibold'>{idea.p2.userName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
