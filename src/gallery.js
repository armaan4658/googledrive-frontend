import CloseIcon from '@material-ui/icons/Close';
import './gallery.css';
import { useState } from 'react';
export const Gallery = ({url}) => {
    const [model,setModel] = useState(false);
    const [tempImg,setTempImg] = useState("");
    const getImage = (pic) => {
        setTempImg(pic);
        setModel(true);
    }
    return(
        <>
            <div className={model?"model open":"model"}>
                    <img src={tempImg} alt=""/>
                    <CloseIcon onClick={()=>setModel(false)}/>
            </div>
            <div className="gallery">
                    {url?(
                        url.map((pic,index)=>(
                            <div className="pics">
                                <img 
                                src={`${pic}`} 
                                key={index} 
                                style={{width:'100%'}}
                                onClick={()=>getImage(pic)}
                                alt=""
                                />
                            </div>
                        ))
                    ):(
                        <p></p>
                    )}
            </div>
        </>
    )
}