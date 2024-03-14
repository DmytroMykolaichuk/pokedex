import { useState } from "react";
import { AiOutlineCompress } from "react-icons/ai";
import './Descriptions.css';

export function Descriptions({descriptions}){
    const [indxDescriptions,setIndxDescriptions]=useState(0)

    function handleDescription(action){

        const descCount=descriptions.length

        switch(action){
        case 'next':
            setIndxDescriptions(prev => (prev === descCount - 1) ? 0 : prev + 1);
        break;
        case 'prev':
            setIndxDescriptions(prev => (prev === 0) ? descCount - 1 : prev - 1);
        break;
        default:
            return;
        }
    }

    return(
        <div>
            <div className='monitor_right flex'>
                <p>{descriptions[indxDescriptions]}</p>
            </div>
            <div className='desc_wrap flex'>
                <div className='desc_center_wrap flex'>
                    <button type='button' className='togle_desc_btn flex' onClick={()=>handleDescription('next')}>
                        <AiOutlineCompress style={{color:'var(--secondary-color)'}} size='30px'/></button>
                    <button type='button' className='togle_desc_btn flex' onClick={()=>handleDescription('prev')}>
                        <AiOutlineCompress style={{color:'var(--secondary-color)'}} size='30px'/></button>
                </div>
            </div>
        </div>
    )
}