/**
 * Inclui um * vermelho no label dos campos obrigatorios de acordo com a
 * atividade corrente.
 * 
 * @returns void.
 */
function requiredFields() {
	var mandatoryFields = new Fields();
	var fields = [];

	// Atividade inicial e ajustar solicitacao
	mandatoryFields.addField("", [ABERTURA]);

	// Fim da parte editavel
	fields = mandatoryFields.getFields();
	for (var i = 0; i < fields.length; i++) {
		if (fields[i].activities.indexOf(ACTIVITY) >= 0)
			setRequired(fields[i].id, true);
	}
	setRequiredOnTable();
}

/**
 * Classe para agrupar os campos e atividades.
 * 
 * @returns void.
 */
function Fields() {
	this.fields = [];

	this.addField = function(id, arrayActivities) {
		this.fields.push({
			"id" : id,
			"activities" : arrayActivities
		});
	}

	this.getFields = function() {
		return this.fields;
	}
}

/**
 * Inclui o * vermelho nos labels a partir do nome do campo.
 * 
 * @param name:
 *            name do campo. Utiliza o name para ser compativel com os campos do
 *            tipo radio.
 * @returns void.
 */
function setRequired(name, isAdding) {
	var $element = $('input[name="' + name + '"], textarea[name="' + name + '"], select[name="' + name + '"], checkbox[name="' + name
			+ '"]');
	var $label;

	if ($element.attr('type') == "radio")
		$label = $($element.parent()[0]).parent().prev();
	else
		$label = ($element.prev().length == 0) ? $element.parent().prev() : $element.prev();

	if (isAdding)
		$label.addClass('required');
	else
		$label.removeClass('required');
}