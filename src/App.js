import React from 'react';
import {
    Button,
    Checkbox,
    Div,
    FormLayout,
    FormLayoutGroup,
    Group,
    Input,
    Panel,
    PanelHeader,
    View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import qrCodeGenerator from '@vkontakte/vk-qr';
import Download from '@axetroy/react-download';
import Icon24Download from '@vkontakte/icons/dist/24/download';
import {saveSvgAsPng} from 'save-svg-as-png';
import {CirclePicker} from 'react-color';
import queryString from 'query-string'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'https://vk.com/vkapps_qr',
            isShowLogo: true,
            logoData: false,
            isShowBackground: true,
            backgroundColor: '#ffffff',
            foregroundColor: '#000000',
            allowDownload: false
        };

        this.svgRef = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.savePNG = this.savePNG.bind(this);
    }

    componentDidMount() {
        const values = queryString.parse(window.location.search);
        let platformsWithoutDownload = ['mobile_android', 'mobile_iphone'];
        this.setState({allowDownload: !!platformsWithoutDownload.indexOf(values.vk_platform)});
    }

    savePNG() {
        saveSvgAsPng(this.svgRef.current.children[0], 'png.png')
    }

    onChange(e) {
        const {name, value, checked} = e.currentTarget;
        if (name === 'isShowLogo' || name === 'isShowBackground') {
            this.setState({[name]: checked});
        } else {
            this.setState({[name]: value});
        }
    }

    onBackgroundColorChange = (color) => {
        this.setState({backgroundColor: color.hex});
    };

    onForegroundColorChange = (color) => {
        this.setState({foregroundColor: color.hex});
    };

    render() {
        const {allowDownload, url, isShowLogo, isShowBackground, backgroundColor, foregroundColor} = this.state;
        const options = {
            isShowLogo: isShowLogo,
            isShowBackground: isShowBackground,
            backgroundColor: backgroundColor,
            foregroundColor: foregroundColor,
        };

        const qrSvg = qrCodeGenerator.createQR(url, 256, 'classCode', options);

        let backgroundPresets = ['#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC'];
        let foregroundPresets = ['#000000', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC'];

        return (
            <View activePanel="mainPanel">
                <Panel id="mainPanel">
                    <PanelHeader>QR</PanelHeader>
                    <Group title="Ссылка">
                        <FormLayout>
                            <Input
                                type="string"
                                top="Ссылка"
                                name="url"
                                value={url}
                                onChange={this.onChange}
                                status={url ? 'valid' : 'error'}
                                bottom={url ? '' : 'Введите ссылку'}
                            />
                        </FormLayout>
                    </Group>
                    <Group title="Настройки">
                        <FormLayout>
                            <Checkbox name="isShowLogo" checked={isShowLogo} onChange={this.onChange}>Использовать
                                логотип
                                ВКонтакте</Checkbox>


                            <FormLayoutGroup top="Цвет QR-кода">
                                <Div>
                                    <div style={{
                                        borderRadius: 25,
                                        background: 'var(--background_page)',
                                        padding: 5,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <CirclePicker triangle='hide' colors={foregroundPresets} color={foregroundColor}
                                                      onChangeComplete={this.onForegroundColorChange}/>
                                    </div>
                                </Div>
                            </FormLayoutGroup>

                            <Checkbox name="isShowBackground" checked={isShowBackground}
                                      onChange={this.onChange}>Фон</Checkbox>

                            {isShowBackground ? (<FormLayoutGroup top="Цвет фона">
                                <Div>
                                    <div style={{
                                        borderRadius: 25,
                                        background: 'var(--background_page)',
                                        padding: 5,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <CirclePicker style={{backgroundColor: 'red'}} triangle='hide'
                                                      colors={backgroundPresets} color={backgroundColor}
                                                      onChangeComplete={this.onBackgroundColorChange}/>
                                    </div>
                                </Div>
                            </FormLayoutGroup>) : (null)}
                        </FormLayout>

                    </Group>

                    <Div>
                        <Div style={{
                            textAlign: 'center',
                        }}>
                            <span ref={this.svgRef} dangerouslySetInnerHTML={{__html: url ? qrSvg : ''}}/>
                        </Div>

                        {allowDownload ? (<Div style={{display: 'flex', 'justifyContent': 'space-between'}}>
                            <Button before={<Icon24Download/>} size="xl" style={{maxWidth: 'calc(50% - 4px)'}}
                                    onClick={this.savePNG} stretched>PNG</Button>
                            <Download file="qr.svg" content={qrSvg} style={{flexGrow: 1, maxWidth: 'calc(50% - 4px)'}}>
                                <Button before={<Icon24Download/>} size="xl" stretched>SVG</Button>
                            </Download>
                        </Div>) : (null)}
                    </Div>
                </Panel>
            </View>
        );
    }
}

export default App;
