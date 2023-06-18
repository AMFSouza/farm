export default class AnimalSelector {
    static animalSelected: number = -1;
    static passThrough: boolean = false;
    static getNextAnimal(selected: number, isRightDirection: boolean) : number {
        if (this.animalSelected === -1) {
            return ++this.animalSelected;
        }
        if (isRightDirection) {
            return this.getRightDirection(selected)
        } else {
            return this.getLeftDirection(selected)
        } 
    }

    private static getRightDirection(selected: number) : number {
                    
        if (this.animalSelected === 3) {
            this.animalSelected = 0;
            return this.animalSelected;
        }

        this.animalSelected = (selected === 0 || 
            selected === 1 || 
            selected === 2 || 
            selected === 3) ? ++this.animalSelected : 3; 
        return this.animalSelected;
    }

    private static getLeftDirection(selected: number) : number {
        this.animalSelected = (selected === 1 || 
            selected === 2 || 
            selected === 3 ) ? --this.animalSelected : 3; 
        return this.animalSelected;
    }

}