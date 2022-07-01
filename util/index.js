export const nowText=()=>{
    const now=new Date(Date.now());
    return now.toISOString().split('T')[0];
}