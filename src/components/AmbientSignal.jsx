import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAmbientSignal from '../hooks/useAmbientSignal';

const K = 'sk7pq2vRm9X4tH8dN3Jc6BfL1WzY';

const dec = (s) => {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        out[i] = bin.charCodeAt(i) ^ K.charCodeAt(i % K.length);
    }
    return new TextDecoder().decode(out);
};

const RAW = {
    code: 'IzhuMzl9Phs+bRdmLWUKVHwF',
    en: {
        tag: 'OiV0Pzx7OBVNbQp1Oht1LR1gAyx4',
        title: 'MktkNT12ORxNbxlhOBwYJgtyCSx4',
        lead: 'KgRCUBhcAjcfWj1EAC1cRC8TLAJfLBJsQSQDOhsEXxkCRhkgBFo5WFQtWwwhEyIKUiYDIhE+FHkHA1JQNFwVKw5VN0QRLFEFYBMCAkQrRh9UOx42HUtbFRdGVjNNSz1DFTpcRChcOENCKgNsUiIIMBweRF4=',
        label_a: 'IS5gMSN2',
        value_a: 'RlsHUCF+NwYkdw15VAtqIQp6HjA=',
        label_b: 'MCd2OTwSJho/eAtx',
        body: 'IA5ZFFFGHjseGShcBilLAW5HJUN+IxEnZSIbMVNIBkBHA1Z6BFd1UxUlXUQjUiMPFi0UbHU+CTocGVNZUVMaPQNeeEMdPFBEN1w/ERYjCiBYNhQ6FktDERYSAj1NWjRVHSUYHSFGOENEJxEtQzNU',
        note: 'JwNSUAJbETwMVXhDHSRURChSLgYWLQhsfDYDeUFbG1BDAkRkQxkZWRsmX0QvXyZDUCsIKFQlCXVTBFkVUUUfPANcKhQDIVQIblEvQ1IwBztfdxstUxlWHhVdG3KPucwUFzpdACdHOUNBKwogETUfeRcOWxkHVwQ3CRk6URInSgFufisaFnFWYBFlSmtFS1YEUQJGaF0JeGEgCxY=',
        cta: 'Mih8Pj5lOhcpfh0=',
        close_label: 'MAdYAxQ=',
    },
    fr: {
        tag: 'Jzl2PiJ/PwE+cBd6VA12MBxyBDdz',
        title: 'MSp7OSJ3VhYoGRR1VB53p9VnD0NyB0YfdBs+Fj0=',
        lead: 'JQRCA1FTADcXGTFaAC1KBytDPqCfYhMiETEbMBEHUlCymxU6AhkoRw0rUAsmWjkXWTAPPUQyWjoSCF+z2BISMwNKeFhTDVYHN1AmDEaBzyhYMlR5OwpFGVFhEz4JVjYUFWhUBSdAOaCfYhMiVHcImtoIWB0BVxghCBk5QQxoWxE8Wi8WTmw=',
        label_a: 'Iai+Mz5/Jhcjah0=',
        value_a: 'RlsHUDJgtdspcAxnVBh0JRp6BCY=',
        label_b: 'IyNlMSJ3VhYoGQr3/Qt0JQNyHip5DA==',
        body: 'NgVBHwhXDHIOXCxAEWhIDDxSOQYWgcZseTYNMiceVhhREUdiWwh4HBkpUQhuViRDXCcTbF4iWh0aGFQfA1ZfcgxPPVdUPlcQPFZqF1clRigWNhY1GgpZExQSBj0YS3hGt+FbCC9eLxEWNAk4QzJaK7DCVB8cQhM8Hlx2',
        note: 'Pw4XAxhVGDMBGSsTt+FMASddLhFXYgopEWVKeR4KXlBDAkRkQxkIVQYlUUQ6XD8XUzFGIFQkWikWGUQfH1wTIU1YIVUaPBgQPFw/FfXrSmxEOVotGhlWFxQSFydNSjdGAGhcp+dAIwRYJxQtESIUeRQKUB4QXAJyj7nMFBgtS0QtQYnKUisSPxEkHyscBUNQA1cbOx4ZOUIVJkxEIlZqUAZiCy1Yd0hpQV0Xs9ESRmJXCWgUIRx7Sg==',
        cta: 'Iai+MzRiIhsidxb3/Q==',
        close_label: 'NQ5FHRRA',
    },
    ko: {
        tag: 'n+OvnPqSVr/rjLS/1A==',
        title: 'n+63m/yqVrjVsbKH1GjU7+7e0ts=',
        lead: 'mOCOnPqSms/tGbOExaKL2KKx5o+WxorboXeW0duBhdidlfJygKT039vw1fHSE6bDo67t7N3A17Xxx9rl6N7W003S8aCY3byP6J+hxopii8Odu8rwnv2/nPuHndnl0tOQWmjV8dbY7M8WruPM2trite7fF53pipzq3dXTmFSjn+qirspD2tz2p5TrWrXv79rl7RKd4dnV27WY1bxEpbHiiYT+isaEvPHRmOCTXg==',
        label_a: 'mNiDnPKz',
        value_a: 'mNuGmsm6Vr/slbOU/KOsw24GelPc8vo=',
        label_b: 'n+Ovm9GLVrnBgbKB2A==',
        body: 'n/aDUJqezrjYlbORyGjT69fY7doWr+XQ2+DCterrF53kmpzp9RkQVQMjbBEvW2pAB3JQfd3A6rPB5xdYm4D6vvO9eN/2/BiI1IOn7Y5ijdShvPDNU4Cj5J240r7QrbOn6KOZ+GcTodCCqeT4EbzJ7Z/otpzstla+5aGzlM2lrfyit/KPrNZI',
        note: 'n+CXnemKndj5GWoERn7T4coTf4+t1kZ+Abvn5Z/8p1CdsNq58IW0k+Wjs+yluO5NFqnW0Nvl1rTm9xeb25qdwc0ZtLbYo6bobt/u8trV9qC1y1q05vcXm9u3ms/ZGbOYwKSm9aKvzoiX3kagh8OW69uAp+iam8Z+TdTZmJ/osI/alKb+tmJUfANhkdz3SwKc6qZWYV3VxYhUeAhefgNqNmIBRqCs45b594eg4FHe0dKHgdHf5OHT78bYwccY',
        cta: 'nvKinOyK',
        close_label: 'mOCcmsmC',
    },
    de: {
        tag: 'NiJ5NzR6MxwpfHj36Ap9NhphCyRjDCE=',
        title: 'NiJ5UCJ3OhYid3ViNR10MGNgAyR4Ayo=',
        lead: 'Nx4XGBBBAnIIUDYUBytQEy9QIgZFYhY/SDQSNhsCRAQeQB8hDlE9R1QNWwwhEysBUScALV8wHzdfS1MRAhIfPE1dPUZUDVYeN1gmDEaBwihYMlovFhlVHwNVEzxNTjlGWmhwBTxaajBTLgIjX3cSOAdLUhkfV1YQCFU3XBo9VgNuVYnfRGICJVR3NDwGDF4VA1sRNwMZMF0aPF0WIlI5EFMsSA==',
        label_a: 'MS57Pzl8Ixwq',
        value_a: 'RlsHUCF+NwYkdw15WQtqIQp6HjA=',
        label_b: 'NiJ5PLKkJQcjfgsZJABqJR12',
        body: 'IA5ZFBQSEjsISj1aVBtZEDQTMBZFIwshVDlaNBofFxQUWxg3ABkZWBghWQo0Hh4CUWIHIhEfGy4YP0IRGRJVY10PaRRcG0gNK186DEU2RiNVMgh5NwJEEx5AEntBGS1ZVCxdDSBWaiFTLgkkXyIUPlMRQlAUQB4zAU09Wlo=',
        note: 'NwpEUCJbETwMVXhRBiRRFy1bPkNXL0Z+AXlaFBICF0JBAEB8TWw2QBE6GAUiXy8NFgQPIlUyCDdTHF4CFRITOwMZH1EDIVYKK0FqAkMxASldOAktU4m35FFWHzdNeipRECFMF25ELxFSJwhsRzgIeRcOWlBCAlhyIFgxFEZ4ClJuRidDBnJcfAF3Lw0wS1YFAlUTOq6dNlAdL0xK',
        cta: 'MS5kJLK2IhsqfBY=',
        close_label: 'IAhfHBhXtc0IVw==',
    },
    ja: {
        tag: 'muutlM6Tk9363eeVkPCV',
        title: 'kOmMk/KZldHt2tuHkPelg+CSr9mdoefi1ejbvPzc',
        lead: 'lPKJl9ajkujm3N2Ml8mTjdSTqeKjoeTA0tblvM3F1PH60ff4iIbb0+TO3sn61sXR0+/Aq6vTmdjZiLXYkrDFse6Fu7bmrbrpq7zdgLfVhc2PtPvOkOqok/GwldHi2tuel8uDh8yIqeCdoeXM0tTJuvLn0tXM19PViIbb1/XK2+bF28rm1cPer7D5n/nCgrLckrDktMOyu7Xjq7narbLdgLfdhcyz',
        label_a: 'lsuGmfSe',
        value_a: 'kOigk/KbldHs2tu+l8qXh82fqeGOoeXP0tTybENb0vD6',
        label_b: 'luSgk/Cjk9372tq+l8uth82fqeCKoeT2',
        body: 'kOqkk/CcldH42tuYl8uEh8yJqeGkoeTu0tTTuvHP1PLT0fXhjrvh1/b32+b+0MvL08fXr7D8WhESHFwkBFMeck4IaAJFaBCHzIGp4Iqh5ezU0f+68MrU883R9fmOuObX9dfb5eETDgpFIQk+VX5auvLT3vDw0ffxjrj+0dT50eHi0Mjx083xr7DGn9bliLbTkrPQsey2u7XUq7nxrbLOgLbA',
        note: 'l9SWlf6FldPCC2gGQq2B0HvV1usEcoDblLT78pXdv5bKt5XT+trZipfJoYfOsa36jKrAx9nX/7z2w9Lj0NH3/ImB9df1w9vmx9fy49L43K+w25zTzoK2yJKz0bvsgbu1xKu66K2zy4C07YXPnbT44ZDotJPyupXTwgtoBkKtgdB71dbrBXKA25R3SmlJWwdQJGY1co645tf179vl5drP7tP65a+wwpnb/4i2zpKz77Htuw==',
        cta: 'l9GxmNaR',
        close_label: 'mv2+k/CqldDm',
    },
    zh: {
        tag: 'l9eXlfSXku3M3NeD',
        title: 'm9uVmdCNkfvU0PmCkPeZgu60',
        lead: 'l9aXlvmYntza3eKynN+3gdKbrfqIpcHd1NLSvcrN08jc18j8iIXp0+7M3dvN1Nrl083UqZzxn8LtjpTAkrL0t/6xsbP4io+M/pGjwomm3vbU8se81uzf8PTV48uJgdPQzs7dwdjWwNLVwuQ=',
        label_a: 'ls6hlfuD',
        value_a: 'RlsHUJih9LvqqLyL1a+szKmx8w==',
        label_b: 'lu6mlvyQkMj60feZ',
        body: 'm8SAlcG0kP/J38KjnOeVjPGtr/O6ptvs1s3+sfL/0Ovu1NbVipTm0fvZ0eTP1PH6FgoHO1oDDzgbSxRBQQRHeouB4NL8x93iy9rIzdL50Kq5wVodGhhUHwNWX7bWnLGW8q238quW3Ia884XMsw==',
        note: 'l9SWlf6Fk+Lr3eK6RngKUquK/lbQ3u5+AbHt/JXdv5XVg5XS79zEnJLBuILSuq/sp6Xo/NnX/73LxtLA99vs3Yul4tL+9d3r2Nfy49PS66S/4J/85YO39ZOy4rDtrbyL1a+szKmx84aGxIPQmWVKa0WOjsRE1OraXgm+o9FoCFR0A3pDYxYlbNXu8bz65tL/4NTi7I652g==',
        cta: 'lMqZmN+W',
        close_label: 'lu6Emeaf',
    },
    pl: {
        tag: 'IzltKTJ6ORY3/dx3NWhsNg99GS5/ESwN',
        title: 'IDJwPjD393I+chlmNgt5RB12Bid5DCc=',
        lead: 'IxlNFRJaASsOUJ22EY2jRD32yAJUJ0Y8Qi4ZMRwDXgMFXQQrDkM2UVQtWwwhEz8IRDsSKREgWhwdCE4bHV0GNwlQMRpUAFkWJxMZBlomCSIRLRUqBwpAGbSwVjwMXipbEIyhRCpfK0NVKwMnUCAJMhoIX14=',
        label_a: 'PSpwIj52Nw==',
        value_a: 'RlsHUCF+NwY0dxdjLQtwRAVhDydvFqXfZg==',
        label_b: 'NTl2KjASORYvcBdmIQ==',
        body: 'JBLy6x1bHHIZ/cEUEjpZHoqqagdZYi4tRjwuLBIDF1NAAkBjTREoWxcyTAVuRGoERDgDbF0iGHk3AkQTHkASe01OKlUOaEJEOlItClMvRj9GOBA8FAQXAx5YAyEXTHQUFSpBRCFXLwFEI6LLETkbPgEEU7ToHA==',
        note: 'IBJQHhD39HIXVzFfGiFdRHwDag5XKAdsA2dIb1MZGVAiQhmX9kubhxBoTxc0SjkXXSsFJBEtFDgfCk0TsoEBcgdcPFEaaEITN1Ajp684BS0RLRUqBwpZGRQSASsBVitbAylWHW7RyvcWKRQpVS4OIFMRWAMFUxiW6Bk8Wwc8WRYtSSUNU2IWPksyHnlAWxcdEFgXcl8JagJUOhZEIRN6UwxyVmxkAzl3',
        cta: 'IyRjJzh3JBY3eBU=',
        close_label: 'KQpaGx9bHA==',
    },
    it: {
        tag: 'Jzl2Izx7JQEkdhZxVAF2RA9hGCpgDQ==',
        title: 'IC5wPjB+M3IpfBR4NWhuKwJnC0NyC0YfdBs+Fj0=',
        lead: 'OwpeUBhcAjcfWj1AAClMC25GJAIWJgMuXjsfeRYIWFABQR8xAkosWwYhWwVuXSsQVS0VOFB3FDwfBxA1H1EfMQFWKFEQIVlKbnsrEV9iNSldMxU3UwNWUB1TBTEEWCxbVD1WBW5BIwBZLxYpXyQbeQMORVAYEhUnH1A3Rx1m',
        label_a: 'ISJ0PzxiMxw+eA==',
        value_a: 'RlsHUDJgMxYkbREUMAEYNAJyHip4DQ==',
        label_b: 'NTl2IzQSMhtNaxFnNwlsMAE=',
        body: 'OgVBGRASBycISixVVC5KBT1WagIWCgc7WgMPOBtLFEFBBEdyRUk3RwApGAAnEy0KWSEJbF53PjAACFgCFRtWOwNKMVEZLRgFIhM+AlFiAildOxt5Bx5WUBBeGjcMVyJVVDhdFm5BIxBVIxI4UCUfeR8KFwIYURk/HVw2RxVm',
        note: 'OgcXAxRVGDMBXHhHAilWDTzw6kNfLkZ+AXcXOBQMXh9RAEZgWxd4YAYpGBA7Rz4KFiEJIF4lFXkQA1JQHV1WJh9WLlEGKVYKIR9qFlhiECVfNBMtHBlSUAdXBCCumXhRBzxKBTpHJUNXYhUjQyMfeZHro1AYEhUgCF0xQB1oSwU8UiQNWWIFI18kHz4dCkMZUVcYJh9WeF0YaAtUbl4rBFErCWwDZ0hvUwpbHBQSRmJXCWgUIRx7Sg==',
        cta: 'MCR5NjRgOxM=',
        close_label: 'MANeBRVb',
    },
    uk: {
        tag: 'o/nn1aG0psa9pIikVJintNvj6rOjkvKcoYfdieM=',
        title: 'o8rn6KGhps+9qYivVJiZtOvj1LOkkv6cmIfqeaPK5+WhqabGvaeIqaTY',
        lead: 'o/nnyFHiyYLY6NjkwZm9tPDj9bOOkt2ciXer2KPQ58Chg6bovYx45MuZubT24s+ziJPwnbCG+InNuregyePxgtDp7RSk+unynoea2OfBtvHh6qvWX0vnz6Cypuq8vIiKpPro1J6OmtYWktRs4cKq5KLt58ihiKbpvYeIi6T96NCfpZv0GGK23+Hnq9mi/Reg0OLDgtbp7OTKmIVEnoSa0+b5tvTg36rho9kXoMzixoLe6ebl9JiGtPriyUPm9rb34Nhaice7iaDO4s6D7+nj5MyYirT24s9N',
        label_a: 'o/bn4KGhpsy9mYiqpNzo9A==',
        value_a: 'RlsHUKGtpsm9qYiWpNDo+Z6tmvHm2rbpEYfgidO7oqDl4u6Cz+ne5OY=',
        label_b: 'o8/n0KGipsW9qXjk6piatO7j0rOqkvacrIfnidw=',
        body: 'o/bnwKGGp8S8sYiPpd7p5p+/arKwk+hs4NOr2aPb58egsVYaDE4zYAEpUERtAnpVB2JOnIOHx4jwurWh8ePgg+Xp5eX4mIa12OP5sraS2JyDh8p5o9TnzqC6p9C9iXjkxJiJtPATDgpFIQk+VX5aiPO7h6DG4siC0RmJoqT/GLXM4/+zhZLYnI13quuj2+b4oYym4b2HeOTEmIO1wuLFs4uT552ye1qI+ruJoMASpuy8u4m0pPDo2J6Dm+Hm+kacjIfKicC7iaHx4siC2ejbGg==',
        note: 'o8rnyKGBpu+9iYiPVJiPtPPj8rOMktuchHdIaVO6taHx4saC3+nl5ftoClR8BWqytpLYnIuG+XdTu5agxOP2gtjp7BSly+nln6Wb5hpit8ng1arnU7uOoM/ixYLTGYiDpPXo1J6Km+vm/Lb+HXeq6KLo58Shh1aC0ujY5MqYirT74/6zg5LbnI93quuj0+fPoYKm5r2DiIqk+ujRbuP8s4OT5pyEh8uJybq0oMPixoLQ6eXl+2ja5NoTmtnnwrb54eOq4aLp58hR4seD7uns5feZurXCE5rR5vq2+OHnquSi/RegxeLIcl4JeOX2mbi0/uP4s4uT6WwDZ0hvU7q3oM/izIPuGYiKVHgIXn4DajZiAUg=',
        cta: 'o/Tn9qGmpvC9q4ihpOjo8J6lmsDm7A==',
        close_label: 'o/znwKGIp9K9gYm2pPA=',
    },
    es: {
        tag: 'Jzl2PiJ/PwEk+st6VA12MBxyBDdz',
        title: 'IC704TB+VhYoGRR1VAr79xh2DiIWBiNsYhI2HTwl',
        lead: 'OwpEUBhcAjcfWj1EAClcC25GJENSgc8uWDtaPBAEFwACWxU9BVArQLf7Sg0tXGoMVTcKOF53HzdTB1ZQNFwVOw5VN0QRLFEFYBMCAkQrRh9UOx42HUtTFRvxxXIYVzkUBi1bCyNDLw1FI0Y8UCUbeR8ERFASRwQ7Ako3R1o=',
        label_a: 'IS50PzxiMxw+eA==',
        value_a: 'RlsHUDJgtdspcAx7J2h8IW5jBiJiCygD',
        label_b: 'NTl2IzQSMhdNax1nNwlsIQ==',
        body: 'NgVBs9xTVjceTTkUEjpZFysTK0N+IxEnZSIbMVNIBkBHA1Z6DlYqRhEnGAArX2oJQycBIxE4Wh0aGFQfA1ZfcgdMNkAbaFsLIBMmAhYnEiVAIh8tEktTFVFGA3IMVTFVGjJZRD5SOAIWMAMvXTYXOAFLQwVRQBMxAlQoURo7WUo=',
        note: 'PwoXAxTxxzMBGStRVCxdFzhSJAZVJxSPkHcfNVNZB1AVV1Y/DEA3FBAtGFZ+AXxNFgcIOEMyWi0cD1gDUV4ZIU1ILVFUJFlEK10pFlMsEj5UOVZ5AA4XAx5AAjcMS5uVVD1WRClSJAJSLRRsUDtaOAkKRVCTsuJyAVYrFBc6+80qWj4MRWIVKREyFC0BDlARA/HXPE1YNkAROxgAK19qUAZiAikROhsgHEtTFVEARmBbGTkUGClLRH4DcFMGYjMYcnk=',
        cta: 'MCR5NjhgOxM/',
        close_label: 'MA5FAhBA',
    },
    pt: {
        tag: 'Jzl2PiJ/PwE++tt7VBp9JwtxAyd3',
        title: 'ICJ5MT0SMh1NehdyJg0YIAsTGSZ6BikC',
        lead: 'JQRUs9sSHzwZXCpXEThMCzsTPw4WJwUjEScJMBAEGhgYQQKR3ksxVxtoXhYvUCVDUzEFI18zEz0cS1kRUXcYMQRaNFsEi5EAJ1JkQ34jFCURBB81FwRZUBVXHyoCTHhBGSkYFitQJQ5GJwg/UHcKOAEKFx8CEhUnH1A3Rxs7Fg==',
        label_a: 'IS50PzxiMxw+eA==',
        value_a: 'RlsHUDJgtdspcAx7J2h8IW5jBiJiCygN',
        label_b: 'NTl2IzQSMhdNax1nMwlsIQ==',
        body: 'NgVBGRQSEyEZWHhSBilLAW5DKxFXYi4tRjwuLBIDF1NAAkBjTRE7WwY6XQ0hEy4MFigJK153FSxTL14DEl0ENkQZMkEaPFdELVwnQ1diEi1Wdx44UxhCEVFTGjsMV5uTFWhIBTxSahFTMQEtRTYIeRJLRRUSXRsiCFcrVVo=',
        note: 'PEtEGR9TGnIJXCtVBClKAS1WOKCXYgMhEWVKeRcOFx0QWxlyCVx4BkR6DkpudiQXRCdGOF4zFSpTBERQAEcTcgIZPVoXJ1YQPFI4BltuRjlcdww8HQhSFB5AViEIS5uVVDtXFjpWKwdZYoTMpXcVKlMIRbPYVh8mAkp4RxE6+8chEy8NQjADK0QyCXkSBUMVAhISN00KaBQQLRgJL1olQ1InRn4BZUx1U6iXA1ECRmhdCXhhIAsW',
        cta: 'MCR5NjhgOxM/',
        close_label: 'NQ5UGBBA',
    },
    fi: {
        tag: 'ICp2ICRkN3Ih+tx8MRxhNw==',
        title: 'IC57ND58PxxNcRd4IgF2RANyACJ9CSc=',
        lead: 'IAJSAAFTBTsZGQxdETxXFy9dKwhfMAwtUDlaMrDPQxsURg88TVE9XR8nVkQ+QDMIWSoPP0U4CDASB1sZAlcYcgZYMUEaZhgsL0EjQ2UnCiheOVozsM9DBBgSBjMBUjFaGidWRDtHLw9fIw8gXTJU',
        label_a: 'Iyp7Ozh8Ih0=',
        value_a: 'RlsHUCF+NwYkdw15VAtqIQp6Hir1xg==',
        label_b: 'Pz55MSJmIwEheA1nMQ==',
        body: 'P6iTGBRGtfZNTZuQGYucRCJSPxBTYi4tRjwuLBIDF1NAAkBjV1U0UVRgSAEiWiRDRSsVj5U+FDwdS0cfAkYfchlYMRQwIUsHIUEuShY7DihUJAma10tbGRhGAj0YVDlHHWhMBSlaJENdIwg/QjZaNQYFVgMFUxc5HlwrXVQ4WQglWiQXWTEPYg==',
        note: 'IAJQHhBTGjtNSjlZGT1NRHwDZENCLRMnXjwPLAcKF0JBAEB8TXI5XR8jUQEgEyaggDsSj5U9EzwdS10fBFkZIRlYeFUGPlcQL1IkQ08pFSURIRUwBx9WGhASlNL5GTNGESxRECdHahdZKwslRTIOOBIFFxUfXBM8TQpoGlQ8VxElXCEWQzYHbANnSG9TAFsfUQJGaF0JeGEgCxY=',
        cta: 'JSp/JjhhIhM=',
        close_label: 'IB5bGhQ=',
    },
    sv: {
        tag: 'OiV8Pzx/NxwpfHhnt8x2IAB6BCQ=',
        title: 'IC57ND58WwQsdQ5xIBsYIhdhGSpxDCcA',
        lead: 'Nx4XGBBAViEDWChEFTwYET5DagZCNkY/RzYdLVMbRAkaXR47Hk03Rh07UxBuViEMFiWl+lwjWjBTLlkTCFkaPR1cPF0aZhgsL0EjQ2UnCiheOVo1sM9aHhBWE3IIV3hWEST70iBaJAQWNg8gXXcePFMFThYYWRgzQw==',
        label_a: 'MS57s+d8Pxwq',
        value_a: 'RlsHUCF+NwYkdw15VAtqIQp6HjA=',
        label_b: 'OiV7s+dhOBsjfgtyJglr',
        body: 'IABeExpTVjYIVzZVVC5KBT0TPgpaLkYEUCARDQYKX1BSA0ZkXBlwRwQtVAE6QGoBRCcQP0gkDjweS1IcHVcEcilQK1cbOlxNbkcjD1oxByFcNhQqUwZSFFFWHzxNWDRYHSlWFzpSLQQWJKX6Q3cbLQdLW7PHQRdyBFd4UB0mGAYrX4nVWCsIKx8=',
        note: 'IAJQHhBeEzxNX5uCBjtODSBdLxEWJgMiEWVKeR4KXVBDAkRkQxkaWBUmXEQvXyYCFjEJIRE/Ey0HCkVQFVcYcgFWLEAVOxgBIBM8ClgsBz5Udw8tU4m35FFZBDcJUCxRBiZZRCJWPAZEJxQtQnccmsUZUlAVVxhyXgl4WRUiGFZ+AXxDXS5IbAFnQGlDS2IkMhw=',
        cta: 'MS58IrK2MAYs',
        close_label: 'IB/01B9V',
    },
    nb: {
        tag: 'OiV5Oz5/OxcjfR0UJw12IAd9DQ==',
        title: 'IC57ND58Wxo7fBRiMRxrRAhqGDB/BSgNfQ==',
        lead: 'Nx4XGBBAVjQMVz9RAGhXFD4TLxcWMRAtWiNaKQASXB8ZWwUmAksxRx9oXQ8lXGoEXCcLOBE+WhwdCE4bHV0GNwlQPVpaaHAFPFpqMFMuAiNfdx8tBw5FHB5GVjcDGTpRGIuACiBaJAQWNg8gETMfeR0SRBcbVwQgBF49Gg==',
        label_a: 'MS57s+l8OBsjfg==',
        value_a: 'RlsHUCF+NwYkdw15VAtqIQp6HjA=',
        label_b: 'OiV5PLKqJRwkdx9nMhp5Nws=',
        body: 'IA5ZFFFWEzwDXHhSBilLASATPgpaYi4tRjwuLBIDF1NAAkBjTRErRB0kVBQhQD5DUy4KKUN3PjAACFgCFRtWIQxUNVEaaFUBKhMrD1orByJCMg44FAxSHlFWHzxNXzdGVIudRCLw8hBTYg8iX3cYPB+ojx4fWxg1CFd2',
        note: 'IAJQHhBeEyZNXzdGBz5RCiBWOEMEckhsXDYTeUFbBUZfEjQ+DFcsFBUkVAFuQCUOFiQPIl8yCHkXDkNcUUYENwZSPUdUi5EKbkUjDVgnFGxFPhY/FgdTGRYSlNL5GTNGESxREDpWJAYWLgM6VCUfKlMN9MgDEkViQxk1VR1oClR8BWoIWmxGfAFtSmlTPmMzXw==',
        cta: 'MS58IjR0Ig==',
        close_label: 'Px5cGw==',
    },
};

export default function AmbientSignal() {
    const { i18n } = useTranslation();
    const { visible, position, hide } = useAmbientSignal();
    const [revealed, setRevealed] = useState(false);

    const payload = useMemo(() => {
        if (!revealed) return null;
        const lang = (i18n.language || 'en').split('-')[0];
        const localized = RAW[lang] || RAW.en;
        const decoded = { code: dec(RAW.code) };
        for (const [k, v] of Object.entries(localized)) {
            decoded[k] = dec(v);
        }
        return decoded;
    }, [revealed, i18n.language]);

    if (!visible) return null;

    const close = () => {
        setRevealed(false);
        hide();
    };

    if (!revealed) {
        return (
            <button
                type="button"
                className="amb-dot"
                onClick={() => setRevealed(true)}
                aria-label="Notification"
                style={{
                    top: `${position.topPx}px`,
                    left: `${position.leftPct}%`,
                }}
            >
                <span className="amb-dot__core" aria-hidden="true" />
                <span className="amb-dot__pulse" aria-hidden="true" />
            </button>
        );
    }

    if (!payload) return null;

    return (
        <div
            className="amb-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="amb-modal-title"
            onClick={close}
        >
            <div className="amb-modal" onClick={(e) => e.stopPropagation()}>
                <div className="amb-modal__scanlines" aria-hidden="true" />
                <div className="amb-modal__header">
                    <span className="amb-modal__tag">{payload.tag}</span>
                    <button
                        type="button"
                        className="amb-modal__close"
                        onClick={close}
                        aria-label={payload.close_label}
                    >
                        ×
                    </button>
                </div>

                <h2 id="amb-modal-title" className="amb-modal__title">{payload.title}</h2>
                <p className="amb-modal__lead">{payload.lead}</p>

                <div className="amb-modal__divider" aria-hidden="true" />

                <p className="amb-modal__a-label">{payload.label_a}</p>
                <p className="amb-modal__a-value">{payload.value_a}</p>

                <p className="amb-modal__b-label">{payload.label_b}</p>
                <code className="amb-modal__b-value">{payload.code}</code>

                <p className="amb-modal__instructions">{payload.body}</p>
                <p className="amb-modal__footnote">{payload.note}</p>

                <button type="button" className="amb-modal__cta" onClick={close}>
                    {payload.cta}
                </button>
            </div>
        </div>
    );
}
