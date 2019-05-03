package it.andreaschiona.todoapp.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.validation.constraints.NotNull;

/**
 * Rappresenta una risposta tecnica, con l'esito della chiamata composto da un
 * esito (0 in caso di "ok", o un codice di errore altrimenti) e da un eventuale messaggio
 * <p>
 * Created by andrea_s on 09/10/2018.
 */
@ApiModel(description = "Esito di un'operazione")
public class RestResponse {

    @ApiModelProperty(notes = "Esito dell'operazione. '0' in caso di successo, un codice di errore altrimenti", example = "0", required = true, position = 0)
    @NotNull
    private String code;

    @ApiModelProperty(notes = "Eventuale messaggio. In caso di errore conterrà la descrizione dell'errore.", example = "Messaggio preso in carico", required = false, position = 1)
    private String message;

    public RestResponse() {
    }

    public RestResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SIMPLE_STYLE);
    }
}
