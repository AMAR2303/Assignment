
const search= document.getElementById('search');
const matchList= document.getElementById('match-list');

const searchcities= async searchText=>{
    const res= await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
    const cities= await res.json();
    
    let matches= cities.filter(city=>{
        const regex= new RegExp(`^${searchText}`,'gi');
        return city.city.match(regex)
    });
    if (searchText.length<5){
        matches=[];
        matchList.innerHTML='';
    }
    outputHtml(matches);
    // memop(matches);  
};

const outputHtml=matches=>{
    if (matches.length>0){
        const html= matches.map(
            match=>`
            <div class="card card-body mb-1">
                <h4>${match.city}</h4>
            </div>
            `
        )
        console.log('Actual fn');
        matchList.innerHTML=html;
    }
}
const memo= new Map();
const memoizeFunc=(func)=>{
    const memoizedFunc=(...args)=>{
        const memokey=args.toString();
        if (memo.has(memokey)){
            console.log("Result form memo");
            return memo.get(memokey);
        }else{
            const funcReturn= func.apply(null,args);
            memo.set(memokey,funcReturn);
            return funcReturn;
        }
    }
    return memoizedFunc;
};
const memop= memoizeFunc(searchcities);

search.addEventListener('input', ()=>memop(search.value));