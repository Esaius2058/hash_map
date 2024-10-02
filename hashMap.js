class HashMap {
    constructor() {
        this.buckets = new Array(16);
        this.capacity = 16;
        this.size = 0;
        this.loadFactor = 0.75;
        this.threshold =  this.capacity * this.loadFactor;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity);

        for (let i = 0; i < this.buckets.length; i++){
            const bucket  = this.buckets[i];
            if(bucket) {
                for (let j = 0; j < bucket.length; j++){
                    //Destructure the current key-value pair from the bucket.
                    const [key, value] = bucket[j];
                    const newIndex = this.hash(key) % newCapacity;
                    if(!newBuckets[newIndex]){
                        //If there isn't already an array at this new index, we create one.
                        newBuckets[newIndex] = [];
                    }
                    //Add the key-value pair to the appropriate bucket in the new array.
                    newBuckets[newIndex].push([key, value]);
                }
            }
        }

        // update the HashMap's properties
        this.buckets = newBuckets;
        this.capacity = newCapacity;
        this.threshold = this.capacity * this.loadFactor;
    }

    hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode  % this.capacity;
    }

    set = (key, value) => {
        if (this.size >= this.threshold) {
            this.resize();
        }

        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        
        // Check if key already exists in ANY bucket
        for (let i = 0; i < this.buckets.length; i++) {
            // Handling collisions
            if (this.buckets[i]) {
                for (let j = 0; j < this.buckets[i].length; j++) {
                    if (this.buckets[i][j][0] === key) {
                        // Key found, update its value
                        this.buckets[i][j][1] = value;
                        console.log("Updating:", key, "at index:", i, "to", value);
                        console.log("Current Bucket:", this.buckets[i]);
                        return; // Exit method, no need to increment size
                }
            }
        }
    }
        
        // If we've reached here, the key doesn't exist, so add it
        this.buckets[index].push([key, value]);
        this.size++;
    }

    get = (key) => {
        const index = this.hash(key) % this.capacity;
        for (let i = 0; i < this.buckets[index].length; i++){
            if(this.buckets[index][i][0] === key){
                const value = this.buckets[index][i][1];
                return value;
            }
        }
        return null;
    }

    has = (key) => {
        const index = this.hash(key) % this.capacity;
        for (let i = 0; i < this.buckets[index].length; i++){
            if(this.buckets[index][i][0] === key){
                return true;
            }
        }
        return false;
    }

    length = () => {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i]) {
                count += this.buckets[i].length;
            }
        }
        return count;

        //Or return this.size;
    }

    remove = (key) => {
        const index = this.hash(key) % this.capacity;

        if(!this.buckets[index]){
            return null;
        }
        
        for (let i = 0; i < this.buckets[index].length; i++){
            if(this.buckets[index][i][0] === key){
                const value = this.buckets[index][i][1];
                this.buckets[index][i] = null;
                this.buckets[index].splice(i, 1);
                this.size--;

                if(!this.buckets[index].length === 0){
                    this.buckets[index] = null;
                }

                return value;
            }            
        }
        return null;
    }

    clear = () => {
        for (let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i]) {
                this.buckets[i] = null;
            }
        }
        return this.buckets.length;
    }

    keys = () => {
        const keyArr = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                for(let j = 0; j < this.buckets[i].length; j++){
                    //If a bucket exists in the current index store its key in keyArr
                    if(this.buckets[i][j]){
                        keyArr.push(this.buckets[i][j][0]);
                    }
                }
            }
        }
        return keyArr;
    }

    values = () => {
        const valArr = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                for(let j = 0; j < this.buckets[i].length; j++){
                    //If a bucket exists in the current index store its val in valArr
                    if(this.buckets[i][j]){
                        valArr.push(this.buckets[i][j][1]);
                    }
                }
            }
        }
        return valArr;
    }

    entries = () => {
        const keyVal = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i]){
                for(let j = 0; j < this.buckets[i].length; j++){
                    //If a bucket exists in the current index store its key and value in keyVal
                    if(this.buckets[i][j]){
                        keyVal.push([this.buckets[i][j][0],this.buckets[i][j][1]]);
                    }
                }
            }
        }
        return keyVal;
    }
}
export {HashMap};