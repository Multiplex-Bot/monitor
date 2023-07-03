interface Media {
    url: string;
    proxy_url: string | undefined;
    height: number | undefined;
    width: number | undefined;
}

interface Field {
    name: string;
    value: string;
    inline: boolean | undefined;
}

export default class Embed {
    title: string | undefined;
    type: string | undefined;
    description: string | undefined;
    url: string | undefined;
    timestamp: number | undefined;
    color: number | undefined;
    footer: {
        text: string;
        icon_url: string | undefined;
        proxy_icon_url: string | undefined;
    } | undefined;
    image: Media | undefined;
    thumbnail: Media | undefined;
    video: Media | undefined;
    provider: {
        name: string | undefined;
        url: string | undefined;
    } | undefined;
    author: {
        name: string;
        url: string | undefined;
        icon_url: string | undefined;
        proxy_icon_url: string | undefined;
    } | undefined;
    fields: Field[] | undefined;

    setTitle(title: string): Embed {
        this.title = title;
        return this;
    }

    setType(type: string): Embed {
        this.type = type;
        return this;
    }

    setDescription(description: string): Embed {
        this.description = description;
        return this;
    }

    setUrl(url: string): Embed {
        this.url = url;
        return this;
    }

    setTimestamp(timestamp: number): Embed {
        this.timestamp = timestamp;
        return this;
    }

    setColor(color: number): Embed {
        this.color = color;
        return this;
    }

    setFooter(text: string, iconUrl?: string, proxyIconUrl?: string): Embed {
        this.footer = { text, icon_url: iconUrl, proxy_icon_url: proxyIconUrl };
        return this;
    }

    setImage(
        url: string,
        proxyUrl?: string,
        height?: number,
        width?: number,
    ): Embed {
        this.image = { url, proxy_url: proxyUrl, height, width };
        return this;
    }

    setThumbnail(
        url: string,
        proxyUrl?: string,
        height?: number,
        width?: number,
    ): Embed {
        this.thumbnail = { url, proxy_url: proxyUrl, height, width };
        return this;
    }

    setVideo(
        url: string,
        proxyUrl?: string,
        height?: number,
        width?: number,
    ): Embed {
        this.video = { url, proxy_url: proxyUrl, height, width };
        return this;
    }

    setProvider(name?: string, url?: string): Embed {
        this.provider = { name, url };
        return this;
    }

    setAuthor(
        name: string,
        url?: string,
        iconUrl?: string,
        proxyIconUrl?: string,
    ): Embed {
        this.author = {
            name,
            url,
            icon_url: iconUrl,
            proxy_icon_url: proxyIconUrl,
        };
        return this;
    }

    setFields(fields: Field[]): Embed {
        this.fields = fields;
        return this;
    }
}
