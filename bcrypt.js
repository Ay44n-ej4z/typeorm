const bcryptjs = require("bcryptjs");

const passwordConfig = async(password) => {
    const hashing =  await bcryptjs.hash(password, 10)
    console.log(hashing);
    const comparing = await bcryptjs.compare(password,hashing )
    console.log(comparing);
}

passwordConfig("")