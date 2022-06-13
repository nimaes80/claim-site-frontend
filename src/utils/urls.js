
let baseURL = 'http://0.0.0.0:8001/api/';
const DEBUG = false;

if (!DEBUG) {
    baseURL = 'https://api.stablefarm.net/api/';
}



const urls = {
    baseURL: baseURL,

    adminLogin: 'account/login/admin/',
    login: 'account/login/',
    refreshToken: 'account/refresh/',

    user: 'account/user/',
    userClaim: 'account/user/claim/',
    userProfile: 'account/user/my_profile/',
    withdraw: 'account/user/withdraw/',
    pay: 'account/user/pay/',


    ref_count: 'account/user/ref_count/',
    user_count: 'account/user/user_count/',
    
    faq: 'account/faq/',
    
    contact: 'account/contact us/',
    
    
    systemSetting: 'account/system_setting/get_setting/',
    systemSettingUpdater: 'account/system_setting/update_setting/',


    globalInfo: 'account/global_info/get_info/',
    updateGlobalInfo: 'account/global_info/update_info/',


    socials: 'account/socials/',

};

export default urls;