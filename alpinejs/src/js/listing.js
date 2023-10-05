import { CONSTANTS } from '../../../../js/libs/utils/constants';
function getData() {
    return {
        users: [],
        init() {
            fetch(CONSTANTS.baseUrl+'/venues', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((users) => {
                    this.users = users;
                    console.log(' this.users: ', this.users)
                }
                );
        }
    }
}
