export interface VenueListModel {
    id: any;
    image: string;
    title: string;
    company: string;
    price: string;
  }
  export class contactFormList {
    id: string;
    name: string = '';
    address: string = '';
    emailId: string = '';
    mobileNumber: string = '';
    status: number;
    additionalMessage: string = '';
    internalComment: string = '';
    createdBy: string = '';
    numberOfPeople: number;
    vendorId: string = '';
    enquiryDate: any;
    bookingDate: string;
    venueId: string = '';
    userId: string = '';
    //fields for quotation
    emailQuotation: boolean;
    venuePrice: number;
    type: number;
 }
