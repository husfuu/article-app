package helpers

import (
	"errors"
	"fmt"
	"strings"

	"github.com/go-playground/validator"
)

func ValidateDataRequest(dataReq interface{}) error {
	//* Validate data request
	validate := validator.New()
	err := validate.Struct(dataReq)
	if err != nil {
		if strings.Contains(err.Error(), "failed on the 'required' tag") {
			field := between(err.Error(), "Field validation for ", " failed on the 'required")
			errMsgInd := fmt.Sprintf("Data %s tidak boleh kosong", field)
			return errors.New(errMsgInd)
		} else if strings.Contains(err.Error(), "failed on the 'email' tag") {
			errMsgInd := "Data Email tidak valid"
			return errors.New(errMsgInd)
		} else {
			return errors.New(fmt.Sprintf("Validasi error | err: %s", err.Error()))
		}
	}
	return nil
}

func between(value string, a string, b string) string {
	// Get substring between two strings.
	posFirst := strings.Index(value, a)
	if posFirst == -1 {
		return ""
	}
	posLast := strings.Index(value, b)
	if posLast == -1 {
		return ""
	}
	posFirstAdjusted := posFirst + len(a)
	if posFirstAdjusted >= posLast {
		return ""
	}
	return value[posFirstAdjusted:posLast]
}
