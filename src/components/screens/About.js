import React from 'react';
import './styles/about.css';


const About= () => {
    return ( 
        <div className="about">
             <h1>About us</h1>
             <ul>
                 <li><b>Jobzilla</b> is providing online recruitment services to the companies who need working enthusiasts.
                     <br/> to work for them and uplift their skills with bilateral benefits.
                 </li>
                 <li><b>Jobzilla</b> was founded way back in 2016 and have recruited thousands of college students in different
                     <br/> renowed companies all over Pakistan.
                 </li>
                 <li>We highly recommend startup <b>Companies</b> to come recruit the best individual to fast the pace 
                 <br/> of their success.</li>
             </ul>
             <h1>Security and Signing to the Portal rules</h1>
             <ul>
                 <li><b>Jobzilla</b> is Portal for dedicated Companies to recruit college students for their work. If We
                 <br/> found anyone using this portal as matter of fun. We have all the authority to remove that 
                 individual from the portal.</li>
                 <li>If we found anyone with wrong information we'll not just remove that company from our portal
                     but we'll also <br/>take <b>legal notice</b> against them.
                 </li>
                 <li>Please do make sure to Post <b>jobs</b> with relevent and proper information.</li>
                 <li>This Portal is working only for the college students.</li>
             </ul>
        </div>
     );
}
 
export default About;