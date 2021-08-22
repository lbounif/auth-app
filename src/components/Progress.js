import { Link, withRouter  } from "react-router-dom"

const Progress = ({location: {pathname}}) => {
    const isFirstStep = pathname === '/'
    const isSecondStep = pathname === '/second'
    const isThirdStep = pathname === '/third'
    const isLoginPage = pathname === '/login'

    return (
        <>
           { !isLoginPage ? (
               <div className="steps">
                   <div className= {`${isFirstStep ? 'step-active': 'step'}`}>
                        <div style={{paddingRight: '10px'}}>1 </div>
                        <div>
                            {/* if I am in step 2 or step 3 make a link to step 1 */}
                            { isSecondStep || isThirdStep ? (
                                <Link to="/">Step 1</Link>
                            ): (
                                'Step 1'
                            )}
                        </div>
                   </div>
                   <div className= {`${isSecondStep ? 'step-active': 'step'}`}>
                        <div style={{paddingRight: '10px'}}>2</div>
                        <div>
                            {/* if I am in step 3 make a link to step 2 */}
                            { isThirdStep ? (
                             <Link to="/second">Step 2</Link>
                        ): (
                            'Step 2'
                        )}
                        </div>
                   </div>
                   <div className= {`${isThirdStep ? 'step-active': 'step'}`}>
                        <div style={{paddingRight: '10px'}}>3</div>
                        <div>Step 3</div>
                   </div>
               </div>

           ): (
               <div> </div>
           )} 
        </>
    )
}

export default withRouter(Progress)