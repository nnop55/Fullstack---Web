export class LoadingHelper {
    static getMode(url: string) {
        url = url.split('api')[1]
        const urls = [
            '/user/roles',
            '/car/'
        ]
        const btnUrls = [
            '/auth/login',
            '/auth/register',
            '/auth/verify-email',
            '/auth/verify-code',
            '/auth/recover-password',
            '/car/add',
            '/car/edit',
            '/car/delete'
        ]

        if (urls.includes(url)) {
            return 0
        }

        if (btnUrls.includes(url)) {
            return 1
        }

        return -1

    }
}