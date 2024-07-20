import React, { useState } from 'react'
import ss from '../assets/ss.png'
import { useQuery } from '@apollo/client';
import { ME } from '../connection/query';
export default function Navbar() {
    const { data } = useQuery(ME);
    let flag = false;
    if (data !== undefined) {
        flag = true;
    }
    const [open, setOpen] = useState(false);
    const info = () => {
        setOpen(!open);
    }
    const signout = () => {
        localStorage.removeItem("token");
        window.location.href = '/';
    }
    return (
        <div className='mx-12 rounded-full pb-2'>
            <div className='flex justify-between mx-8'>
                <div className='flex hover:cursor-pointer'>
                    <div>
                        <a href="/">
                            <img className='h-11 w-9' src={ss} alt="img" />
                        </a>
                    </div>
                    <div>
                        <a href="/">
                            <p className='text-white mt-3 text-2xl'>idea</p>
                        </a>
                    </div>
                </div>
                <div className='flex bg-white mt-2 rounded-3xl'>
                    <div className=' hover:cursor-pointer hover:bg-slate-500 hover:rounded-3xl px-3 pt-1'>
                        <a href="/">
                            <svg className='h-8 w-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className=' hover:cursor-pointer hover:bg-slate-500 hover:rounded-3xl px-3 pt-1'>
                        <a href="/post">
                            <img className='h-8 w-8' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2dTYhWVRjHf4rgoBb4QS7SSkVIGSmKScZFLWJUIoQwJBEEExGhcDFRUVGu3Igx4MqKShGEhGhTi4p0URkFLURdSFwRx9DMzFH8jHnlwCXGM+e+M3N9z7nn3vP/wYHZPec+/+d83Oe98zwghBBCCCGEEM2gC1gDDACHgXPANaBV03ET+Av4FfgU2AjMoQY8BuwBLkfgxJbncRv4EuglQmYAu/JJthIcXwGPEglPAqcicEqr4nEFWFe1GKvanA0Xgc+Al4FlwEPUlweBJcDKfCcoCsBh4N2qJtkH3HJMyhzgW4ApNJvngd8KhHk/9GSWAlcdE9kLTCMdJgHbCgJzQ8gr7XHL+H/A66TLs/kWPdInJmAXhzD+gSMa+kMYjpze/H1lpF++8210juMQ/9y30RqxyRGs5uLjjR2WsUvATJ8Ga8hhy0dHfBmaDJzRVjUmPfn1d+RVeBEeeMYSw+yXD/gw1AB+tHz1hg8jb1pGvvZhpCHYvvrGh5EDlpGUr7ljsczy1SAeOGoZedGHkYYww5FSMe9vHeWkZeSpThtoGP9a/prbaQOZZWBBpw00jNO+/SVBIvOXBJkYyQqSpTqvZB+8JBIECRIFmVZIYpFYEm1ZSJAoyLRCEovEkmjLQoJEQaYVklgklkRbFhIkCjKtkMQiMdUtK3N8ZBZy+H4eCYIE6WhEtbRCql2CmQS5P4clc3imeoaUJdl5JfvgJZEgSJAoyLRCEovEkmjLQoJEQaYVklgklkRbFhIkCjKtkMQisSTaspAgUZBphcQVibGS7JYVKxIk9X/6fLrTBhrGUGhBVDhg/IUDggii0hrjL60RRBAvBVUawltVCKLyTMX8VIUgrbwMkRhdV2y4KkFMjffZnTZUc34I9Klq4Yds+zttqMZsbvOxXzBBvJWwqxkrHGViKxPEFFLeTro8B/zdxj9BBHG1pvgEmE46TAZeK/DFndCCvArccEzkT2BrAsX4+4DfC1bDO1UlF/vyvhmuSZklvC/vqfGEjxJ3gdtVmAYEq4HdwB8FzzycvxRWmu3tBk6MsX+mMC4Ba0Nme0+0yfaaips7gesROKYVeJhV8QXwcOgimD+PI9v7SL6k/4nAUS3Pw/QMOQgsr6pM7EQKKXfl7YGMON8DZx2/D9Rp3ADO57WLPwLWA7MmkO01z1/P8tkNIUhZ9h7LiLK948/29vvqt2TftJTtHTvba/5eSKB2R+bwVkOXezli+chkf70x29HySNne9tlec7nxynsOo8r24sz2fksApgLHLMPK9jIq2zvkq9WRi8cL3iuU7eX/g/wVKmg96vpBRtlequ2H62rBmnK29+2qJ9vt6L6T4rgMvEQkTMuzva4mvSmMQ8A8ImQ+MJBItvdmLoRJKUWPuRq/AHyYv6kOtjlr6pLtvQD8Anyct+Zul+0VQgghhBDExF1WTawXCqS8DwAAAABJRU5ErkJggg==" />
                        </a>
                    </div>
                    <div className='pl-3 border-2 border-black hover:cursor-pointer rounded-full bg-slate-400 '>
                        <p onClick={info} className='h-11 pl-2 text-3xl text-black w-11 rounded-full'>{data?.me?.userName.charAt(0).toUpperCase()}</p>
                    </div>
                </div>
            </div>
            {open && (
                <div className="absolute z-30 right-20 top-14 bg-slate-500 text-black shadow-lg rounded-3xl p-4 dropdown-menu">
                    <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        {flag ? <p className='text-lg font-semibold'>{data.me.email}</p> : <p className='text-lg font-semibold'>Email</p>}
                    </div>
                    <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {flag ? <p className='text-lg font-semibold'>{data.me.userName}</p> : <p className='text-lg font-semibold'>userName</p>}
                    </div>
                    <a href="/help">
                        <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className='text-lg font-semibold'>Help</p>
                        </div>
                    </a>
                    <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                        {flag ?
                            <div className='flex'>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
                                </svg>
                                <p className='text-lg ml-2 -mt-1  font-semibold' onClick={signout}>SignOut</p>
                            </div>
                            :
                            <div className='flex'>
                                <img className="h-6 w-6" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC1klEQVR4nO2ZS2tTURDHf8RobbOxSgVbXYk7FRfWBBT9DlJ0LYiKj4WChvhApWpdqq36CQSLFqrix1CwBCnWV30UpbTgs6mbKwdmUYaT5uRmbh6QPxwIyZ3/zJx7zrwCbbTRhgVSQA44D4wBRWAe+CdrXr57DBSArMg0HBuBIeAzEFW5nMwNoK8Rhq8D7gGLMQzXqwTcBdbWy/iDwKyB4Xo5zgNJGp6WXS9nwG/gGXAc2A1sBjLASqAH6AcOAw+AH8vwjIguU3SKcT6Fn4ATwOoq+Q4Bk2U4n8ozJkiXMd6d/3NAR43cZ4C/Hv4nVm/ivof8PbALO/QDXz16hi0urCZ9LWfaGr3AS4++gVpC5axn55OM2z3AG6XzO9Adh0xHHJdRt5M8tnruxJ04GbakSK5SP1xQuhfkiAVjSBG8DYg2V7BDxnOpr4cKpzy1zekAucjYiaPKhunQAjDnybBrAuQiYye6gJ/KFhduK6KghFx5HIIoASceKt58iNCYEjobqCxKwIkjivNRiFBRCe0NVBYl4ERW8U2ECM3FLIejBJxYr7hcYq0IiyZFr5sxHehQPKVGOXC5ng7MtfoRKiqhfQ28xLk4l1iHUde0tFQYLTRRIhuNk8h07P0TWI9bG58BfilbdsYt5lzfWgmWxjsci1vMIROzpcLvGlBOzygbrlVD0OdpaAapHy7V2tAg4z7dUu4geWzztJS3rZr6j8Amkm3qp6yaemRWqeP7pGTIJIx/4dG3v1biEQ/pBwm3lsdmyqPnlgV5WmaVkedO5GscLWaAi2VGi+PACozQKbNKX73zBThV5TC2S+L8TBnOccvh7tI3MbxM1eky9nPgJLAH2CI7vEruTFYmDaOeDBupiGO28z4MSGSIjNc3iwsbim4Z9+lkF2ctyK6HjG7M0SsTs+kYhjsZVx5soAmQkqFTXmr2CensFmW5z6/kt7w82xR/s7bRBi2O/6ddKnwzyZuCAAAAAElFTkSuQmCC"></img>
                                <a href="/signup">
                                    <p className='text-lg ml-2 -mt-1 font-semibold'>SignIn</p>
                                </a>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}