export function initListingContent() {
    return {
        isDescriptionExpanded: false,
        toggleListingDescription() {
            this.isDescriptionExpanded = !this.isDescriptionExpanded;
            //console.log('clicked');
        }
    }
}