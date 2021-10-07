import {useEffect } from 'react';

const url = (endpoint) => {
    return `http://localhost:1000${endpoint}`
}

const isEmpty = (arg) => {
	if (arg == null) {
		return true;
	} else if (typeof arg === "undefined") {
		return true;
	} else if (arg.length === 0) {
		return true;
	} else if (typeof arg === "object" && Object.keys(arg).length === 0) {
		return true;
	}
	return false;
};

function useEffectAsync(effect, inputs) {
    useEffect(() => {
        effect();
    }, inputs);
}

// function useEffectAsync(asyncFn, onSuccess) {
//     useEffect(() => {
//       let isActive = true;
//       asyncFn().then(data => {
//         if (isActive) onSuccess(data);
//       });
//       return () => { isActive = false };
//     }, [asyncFn, onSuccess]);
//   }


const replaceWithIndex = (array, index, element) => {
    array.splice(index, 1, element);
    return array
}
  

const xrange = (start=0, stop=5, step=1) => {
    let array = []
    let i =start;
    while (i <= stop){
        array.push(i);
        i += step;
    }
    return array
}

const xiter = (stop=10) => {
    let array = []
    let i = 1;
    while (i <= stop){
        array.push(i);
        i += 1;
    }
    return array
}


const randomHash = (length = 24) => {
	var result = "";
	var characters =
		"abcdef0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
};

export { url, isEmpty, useEffectAsync, randomHash, xrange, xiter};