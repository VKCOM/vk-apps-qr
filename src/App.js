import React from 'react';
import {Button, Div, FormLayout, Group, Input, ListItem, Panel, PanelHeader, Select, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import qrCodeGenerator from '@vkontakte/vk-qr';
import Download from '@axetroy/react-download';
import Icon24Download from '@vkontakte/icons/dist/24/download';
import {saveSvgAsPng} from 'save-svg-as-png';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'https://vk.com',
            size: '300',
        };

        this.svgRef = React.createRef();

        this.onChange = this.onChange.bind(this);
    }

    svg(url) {
        let segs = qrCodeGenerator.QrSegment.makeSegments(url);
        let svg = qrCodeGenerator.QrCode.encodeSegments(segs, qrCodeGenerator.QrCode.Ecc.QUARTILE, 1, 40, -1, true).toSvgString();

        return <span ref={this.svgRef} dangerouslySetInnerHTML={{__html: url ? svg : ''}}/>;
    }

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    render() {
        const {url, size} = this.state;

        let segs = qrCodeGenerator.QrSegment.makeSegments(url);
        let svg = qrCodeGenerator.QrCode.encodeSegments(segs, qrCodeGenerator.QrCode.Ecc.QUARTILE, 1, 40, -1, true).toSvgString();


        return (
            <View activePanel="mainPanel">
                <Panel id="mainPanel">
                    <PanelHeader>QR</PanelHeader>
                    <Group>
                        <FormLayout>
                            <Input
                                type="string"
                                top="URL"
                                name="url"
                                value={url}
                                onChange={this.onChange}
                                status={url ? 'valid' : 'error'}
                                bottom={url ? '' : 'Введите URL'}
                            />

                            <Select top="Размер" name="size" onChange={this.onChange}>
                                <option value="300">300x300</option>
                                <option value="500">500x500</option>
                                <option value="200">200x200</option>
                                <option value="100">100x100</option>
                            </Select>
                        </FormLayout>

                        <Div style={{
                            width: size + 'px',
                            height: size + 'px',
                            margin: 'auto'
                        }}>
                            {this.svg(url, size)}
                        </Div>

                        <Div>
                            <Button before={<Icon24Download/>} size="l" onClick={() => {
                                saveSvgAsPng(this.svgRef.current.children[0], "png.png")
                            }}>PNG</Button>
                            <Download style={{display: 'inline'}} file="qr.svg" content={svg}>
                                <Button before={<Icon24Download/>} size="l">SVG</Button>
                            </Download>

                        </Div>
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default App;
