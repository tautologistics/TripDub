<xsl:stylesheet version = '1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method="html" media-type="text/html" />

	<xsl:template match="/sqldata">
		<html>
		<body id="body">

		<h4>
			<xsl:text>Query: </xsl:text>
			<xsl:value-of select="query" />
		</h4>
		<h4>
			<xsl:text>Total Rows: </xsl:text>
			<xsl:value-of select="count(Item)" />
		</h4>
		<table border="1">

			<xsl:apply-templates select="Item[1]" mode="row_header" />
			<xsl:apply-templates select="Item" mode="row" />
		
		</table>

		</body>
		</html>
	</xsl:template>

	<xsl:template match="*" mode="row_header">
			<th class="headerRow">
				<xsl:apply-templates select="*" mode="col_header" />
			</th>
	</xsl:template>

	<xsl:template match="*" mode="col_header">
		<td>
			<xsl:value-of select="name()" />
		</td>
	</xsl:template>

	<xsl:template match="*" mode="row">
		<tr>
			<xsl:attribute name="class">
				<xsl:choose>
					<xsl:when test="(position() mod 2) = 1">
						<xsl:text>oddRow</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>evenRow</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<td>
				<xsl:value-of select="position()" />
			</td>
			<xsl:apply-templates select="*" mode="col" />
		</tr>
	</xsl:template>

	<xsl:template match="*" mode="col">
		<td>
			<xsl:value-of select="." />
		</td>
	</xsl:template>

</xsl:stylesheet>