export const initialState = {
  posts: {
    data: [
      { title: 'Title 1', author: { email: 'a1@a1.org', phone:'33224411', location:'Rio', isLogged: false }, published: '01/01/2022', revised: '12/03/2022', status:'published', content: 'GoodEnergyarguesthat thestorieson ourscreens', price: '10', img: '/img/uploads/camera-1840054_640-min.jpg', id: '111'},
      { title: 'Title 2', author: { email: 'a2@a2.org', phone:'44224115', location:'York', isLogged: false }, published: '02/01/2022', revised: '12/25/2022', status:'published', content: 'Thisincludes imaginingwhatcouldgo', price: '11', img: '/img/uploads/sax-4085168_640-min.jpg', id: '112'},
      { title: 'Title 3', author: { email: 'a2@a2.org', phone:'55211455', location:'London', isLogged: false }, published: '03/01/2022', revised: '14/03/2022', status:'published', content: 'importance ofthorough researchandav', price: '20', img: '/img/uploads/marshall-2405811_640-min.jpg', id: '113'},
      { title: 'Title 4', author: { email: 'a2@a2.org', phone:'77221455', location:'Lodz', isLogged: false }, published: '04/01/2022', revised: '15/03/2022', status:'closed', content: 'intersectionality andincluding margi', price: '19', img: '/img/uploads/clock-3179167_640-min.jpg', id: '114'},
      { title: 'Title 5', author: { email: 'a3@a3.org', phone:'99225455', location:'Wroclaw', isLogged: false }, published: '05/01/2022', revised: '16/03/2022', status:'draft', content: 'the phonewithas manyscreenwrite', price: '16', img: '/img/uploads/bike-909690_640-min.jpg', id: '115'}
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  authors:  { email: 'a1@a1.org' , isLogged: false, role: '' },
};
