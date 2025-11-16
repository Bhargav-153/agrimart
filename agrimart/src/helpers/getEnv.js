export const getEnv = (envname) =>{
    const enc =  import.meta.env
    return enc[envname]
  
  }